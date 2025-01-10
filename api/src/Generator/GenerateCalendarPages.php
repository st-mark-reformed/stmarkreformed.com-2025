<?php

declare(strict_types=1);

namespace App\Generator;

use App\Calendar\EventRepository;
use App\Calendar\Month\MonthDayFactory;
use App\Pages\Page\Page;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageType;
use Config\SystemTimezone;
use DateInterval;
use Psr\Clock\ClockInterface;
use Redis;

use function array_map;
use function array_merge;
use function array_values;
use function explode;
use function implode;
use function json_encode;

class GenerateCalendarPages
{
    /** @var string[] */
    private readonly array $monthRange;

    public function __construct(
        ClockInterface $clock,
        private readonly Redis $redis,
        private readonly SystemTimezone $systemTimezone,
        private readonly EventRepository $eventRepository,
        private readonly MonthDayFactory $monthDayFactory,
    ) {
        $today = $clock->now()->setTimezone($this->systemTimezone);

        $oneYear      = new DateInterval('P1Y');
        $oneYearAgo   = $today->sub($oneYear);
        $oneYearAhead = $today->add($oneYear);

        $monthRange  = [];
        $currentDate = $oneYearAgo;

        while ($currentDate <= $oneYearAhead) {
            $monthRange[] = $currentDate->format('Y-m');
            $currentDate  = $currentDate->add(new DateInterval('P1M'));
        }

        $this->monthRange = $monthRange;
    }

    /** @return string[] a list of paths generated */
    public function fromPage(Page $page): array
    {
        if (! $page->type === PageType::calendar) {
            return [];
        }

        $monthRange = $this->monthRange;

        return array_values(array_map(
            fn (string $month) => $this->processMonthPage(
                $month,
                $page,
            ),
            $monthRange,
        ));
    }

    private function processMonthPage(
        string $month,
        Page $page,
    ): string {
        $eventsForMonth = $this->eventRepository->getEventsForMonth(
            $month,
            $page->path->value,
        );

        $monthDays = $this->monthDayFactory->create(
            $month,
            $eventsForMonth,
        );

        $pageCachePath = implode('/', [
            $page->path->value,
            implode(
                '/',
                explode('-', $month),
            ),
        ]);

        $this->redis->set(
            'static_page_data:' . $pageCachePath,
            json_encode(array_merge(
                $page->asScalarArray(
                    new PagePropertyCollection([
                        PageProperty::children,
                    ]),
                ),
                [
                    'monthDays' => $monthDays->asScalarArray(),
                    'monthRows' => $monthDays->rows(),
                ],
            )),
        );

        return $pageCachePath;
    }
}
