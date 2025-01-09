<?php

declare(strict_types=1);

namespace App\Calendar;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItemWithKey;

use function array_filter;
use function count;

readonly class EnqueueCacheRemoteIcsFiles
{
    public function __construct(private QueueHandler $queueHandler)
    {
    }

    public function __invoke(): void
    {
        $this->enqueue();
    }

    public function enqueue(): void
    {
        if (
            count(array_filter(
                $this->queueHandler->getEnqueuedItems()->asArray(),
                static fn (
                    QueueItemWithKey $q,
                ) => $q->handle === CacheRemoteIcsFiles::JOB_HANDLE,
            )) > 0
        ) {
            return;
        }

        $this->queueHandler->enqueueJob(
            CacheRemoteIcsFiles::JOB_HANDLE,
            CacheRemoteIcsFiles::JOB_NAME,
            CacheRemoteIcsFiles::class,
        );
    }
}
