<?php

declare(strict_types=1);

namespace App\Pages\Generator;

use BuzzingPixel\Queue\QueueHandler;

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
        $this->queueHandler->enqueueJob(
            GenerateSiteData::JOB_HANDLE,
            GenerateSiteData::JOB_NAME,
            GenerateSiteData::class,
        );
    }
}
