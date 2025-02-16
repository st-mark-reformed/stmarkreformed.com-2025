<?php

declare(strict_types=1);

namespace App\Generator;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItemWithKey;

use function array_filter;
use function count;

readonly class EnqueueGenerateSiteData
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
                $this->queueHandler->getEnqueuedItems()->queueItems,
                static fn (
                    QueueItemWithKey $q,
                ) => $q->handle === GenerateSiteData::JOB_HANDLE,
            )) > 0
        ) {
            return;
        }

        $this->queueHandler->enqueueJob(
            GenerateSiteData::JOB_HANDLE,
            GenerateSiteData::JOB_NAME,
            GenerateSiteData::class,
        );
    }
}
