<?php

declare(strict_types=1);

namespace App\Calendar;

use App\Calendar\Month\MonthRangeFactory;
use DateTimeImmutable;
use DateTimeZone;
use ICal\ICal;
use Redis;

use function array_map;
use function assert;
use function is_string;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class EventRepository
{
    public function __construct(
        private Redis $redis,
        private MonthRangeFactory $monthRangeFactory,
    ) {
    }

    /** @param string $month 2024-02, 2025-10, etc. */
    public function getEventsForMonth(
        string $month,
        string $pagePath,
    ): EventCollection {
        $monthRange = $this->monthRangeFactory->make($month);

        $ics = $this->redis->get('static_ics_data:' . $pagePath);

        if (! is_string($ics)) {
            return new EventCollection();
        }

        $ical = new ICal(options: [
            'defaultTimezone' => new DateTimeZone('US/Central'),
        ]);

        $ical->initString($ics);

        $endDate = $monthRange->getEndDate() ?? $monthRange->getStartDate();

        $icalEvents = $ical->eventsFromRange(
            $monthRange->getStartDate()->format('Y-m-d h:i:s'),
            $endDate->format('Y-m-d h:i:s'),
        );

        return new EventCollection(array_map(
            static function (\ICal\Event $event): Event {
                $startDate = DateTimeImmutable::createFromFormat(
                    'Ymd\THis',
                    $event->dtstart_tz,
                    new DateTimeZone('US/Central'),
                );
                assert($startDate instanceof DateTimeImmutable);

                $endDate = DateTimeImmutable::createFromFormat(
                    'Ymd\THis',
                    $event->dtend_tz,
                    new DateTimeZone('US/Central'),
                );
                assert($endDate instanceof DateTimeImmutable);

                return new Event(
                    uid: $event->uid,
                    summary: $event->summary,
                    description: $event->description ?? '',
                    location: $event->location ?? '',
                    startDate: $startDate,
                    endDate: $endDate,
                );
            },
            $icalEvents,
        ));
    }
}
