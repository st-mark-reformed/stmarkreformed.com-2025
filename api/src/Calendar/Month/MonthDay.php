<?php

declare(strict_types=1);

namespace App\Calendar\Month;

use App\Calendar\EventCollection;
use RxAnte\DateImmutable;

readonly class MonthDay
{
    public function __construct(
        public bool $isInPast,
        public bool $isCurrentDay,
        public bool $isActiveMonth,
        public DateImmutable $day,
        public EventCollection $events,
    ) {
    }
}
