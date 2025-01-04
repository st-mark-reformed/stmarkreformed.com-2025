<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal;

use App\ImageHandling\Resizing\Internal\ResizeByHeight\ResizeImageByHeightQueueJob;
use App\ImageHandling\Resizing\Internal\ResizeByWidth\ResizeImageByWidthQueueJob;
use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItemWithKey;
use Exception;

use function array_filter;
use function count;
use function implode;
use function str_replace;

readonly class PushToQueueIfNotInQueue
{
    public function __construct(private QueueHandler $queueHandler)
    {
    }

    /** @param class-string<ResizeImageByWidthQueueJob|ResizeImageByHeightQueueJob> $class */
    public function push(
        string $pathOrUrl,
        int $pixelWidthOrHeight,
        string $class,
    ): void {
        $keySafePathOrUrl = str_replace(
            ['/', ':', '.'],
            '_',
            $pathOrUrl,
        );

        $context = ['pathOrUrl' => $pathOrUrl];

        if ($class === ResizeImageByWidthQueueJob::class) {
            $context['pixelWidth'] = $pixelWidthOrHeight;
        } else {
            $context['pixelHeight'] = $pixelWidthOrHeight;
        }

        $handle = match ($class) {
            ResizeImageByWidthQueueJob::class => implode(
                '-',
                [
                    'resize-image-by-width',
                    $pixelWidthOrHeight,
                    $keySafePathOrUrl,
                ],
            ),
            ResizeImageByHeightQueueJob::class => implode(
                '-',
                [
                    'resize-image-by-height',
                    $pixelWidthOrHeight,
                    $keySafePathOrUrl,
                ],
            ),
            default => throw new Exception('Invalid class'),
        };

        $name = match ($class) {
            ResizeImageByWidthQueueJob::class => implode(
                ' - ',
                [
                    'Resize Image by Width',
                    $pixelWidthOrHeight,
                    $keySafePathOrUrl,
                ],
            ),
            ResizeImageByHeightQueueJob::class => implode(
                ' - ',
                [
                    'Resize Image by Height',
                    $pixelWidthOrHeight,
                    $keySafePathOrUrl,
                ],
            ),
            default => throw new Exception('Invalid class'),
        };

        if (
            count(array_filter(
                $this->queueHandler->getEnqueuedItems()->asArray(),
                static fn (
                    QueueItemWithKey $q,
                ) => $q->handle === $handle,
            )) > 0
        ) {
            return;
        }

        $this->queueHandler->enqueueJob(
            handle: $handle,
            name: $name,
            class: $class,
            context: $context,
        );
    }
}
