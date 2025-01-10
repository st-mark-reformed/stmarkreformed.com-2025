<?php

declare(strict_types=1);

namespace App\Calendar;

use Config\SystemTimezone;
use DateTimeImmutable;

use function assert;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class EventFactory
{
    public function __construct(private SystemTimezone $systemTimezone)
    {
    }

    public function createFromICalEvent(\ICal\Event $event): Event
    {
        $startDate = DateTimeImmutable::createFromFormat(
            'Ymd\THis',
            $event->dtstart_tz,
            $this->systemTimezone,
        );
        assert($startDate instanceof DateTimeImmutable);

        $endDate = DateTimeImmutable::createFromFormat(
            'Ymd\THis',
            $event->dtend_tz,
            $this->systemTimezone,
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
    }
}
