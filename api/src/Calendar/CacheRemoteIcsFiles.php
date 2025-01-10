<?php

declare(strict_types=1);

namespace App\Calendar;

use App\Pages\Page\Page;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use Config\SystemTimezone;
use DateInterval;
use DateTimeImmutable;
use Hyperf\Guzzle\ClientFactory;
use ICal\ICal;
use Psr\Clock\ClockInterface;
use Redis;

use function array_map;
use function serialize;

readonly class CacheRemoteIcsFiles
{
    public const string JOB_HANDLE = 'cache-remote-ics-files';

    public const string JOB_NAME = 'Cache Remote ICS Files';

    private DateTimeImmutable $oneYearAgo;

    private DateTimeImmutable $oneYearAhead;

    public function __construct(
        ClockInterface $clock,
        private Redis $redis,
        private EventFactory $eventFactory,
        private PageRepository $pageRepository,
        private SystemTimezone $systemTimezone,
        private ClientFactory $guzzleClientFactory,
    ) {
        $today = $clock->now()->setTimezone($this->systemTimezone);

        $oneYear = new DateInterval('P1Y');

        $this->oneYearAgo = $today->sub($oneYear);

        $this->oneYearAhead = $today->add($oneYear);
    }

    public function __invoke(): void
    {
        $this->cache();
    }

    public function cache(): void
    {
        $this->pageRepository->findAllPages()->walkAll(
            function (Page $page): void {
                if ($page->type !== PageType::calendar) {
                    return;
                }

                $this->processPage($page);
            },
        );
    }

    private function processPage(Page $page): void
    {
        $requestResponse = $this->guzzleClientFactory->create()->get(
            $page->data->value,
        );

        $icsContents = $requestResponse->getBody()->getContents();

        $this->redis->set(
            'static_ics_data:' . $page->path->value,
            $icsContents,
        );

        $ical = new ICal(options: [
            'defaultTimezone' => $this->systemTimezone,
        ]);

        $ical->initString($icsContents);

        $icalEvents = $ical->eventsFromRange(
            $this->oneYearAgo->format('Y-m-01 00:00:00'),
            $this->oneYearAhead->format('Y-m-01 00:00:00'),
        );

        $eventCollection = new EventCollection(array_map(
            function (\ICal\Event $event): Event {
                return $this->eventFactory->createFromICalEvent($event);
            },
            $icalEvents,
        ));

        $this->redis->set(
            'all_events_cache:' . $page->path->value,
            serialize($eventCollection),
        );
    }
}
