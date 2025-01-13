<?php

declare(strict_types=1);

namespace App\Calendar;

use Redis;

use function is_string;
use function unserialize;

readonly class EventRepository
{
    public function __construct(
        private Redis $redis,
    ) {
    }

    private function getEventsCache(string $pagePath): EventCollection
    {
        $allEventCache = $this->redis->get('all_events_cache:' . $pagePath);

        if (! is_string($allEventCache)) {
            return new EventCollection();
        }

        $allEvents = unserialize($allEventCache);

        if (! ($allEvents instanceof EventCollection)) {
            return new EventCollection();
        }

        return $allEvents;
    }

    /** @param string $month 2024-02, 2025-10, etc. */
    public function getEventsForMonth(
        string $month,
        string $pagePath,
    ): EventCollection {
        return $this->getEventsCache($pagePath)->filter(static fn (
            Event $e,
        ) => $e->startDate->format('Y-m') === $month);
    }

    public function getUpcomingEvents(
        string $pagePath,
        int $limit = 8,
    ): EventCollection {
        return $this->getEventsCache($pagePath)->filter(
            static fn (Event $event) => ! $event->isInPast,
        )->fromLimit($limit);
    }
}
