<?php

declare(strict_types=1);

namespace Config;

use App\Calendar\CacheRemoteIcsFiles;
use BuzzingPixel\Scheduler\Frequency;
use BuzzingPixel\Scheduler\ScheduleItem;
use BuzzingPixel\Scheduler\ScheduleItemCollection;

readonly class ScheduleFactory implements \BuzzingPixel\Scheduler\ScheduleFactory
{
    public function createSchedule(): ScheduleItemCollection
    {
        return new ScheduleItemCollection([
            new ScheduleItem(
                Frequency::FIVE_MINUTES,
                CacheRemoteIcsFiles::class,
            ),
        ]);
    }
}
