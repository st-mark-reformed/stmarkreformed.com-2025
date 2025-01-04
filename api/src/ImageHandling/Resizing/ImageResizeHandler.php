<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing;

use App\Files\ImageCacheFileSystem;
use App\ImageHandling\Resizing\Internal\FileNameCompiler;
use App\ImageHandling\Resizing\Internal\PushToQueueIfNotInQueue;
use App\ImageHandling\Resizing\Internal\ResizeByHeight\ResizeImageByHeightQueueJob;
use App\ImageHandling\Resizing\Internal\ResizeByWidth\ResizeImageByWidthQueueJob;
use App\UrlGenerator;

readonly class ImageResizeHandler
{
    public function __construct(
        private UrlGenerator $urlGenerator,
        private FileNameCompiler $fileNameCompiler,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private PushToQueueIfNotInQueue $pushToQueueIfNotInQueue,
    ) {
    }

    public function resizeToWidthExists(
        string $pathOrUrl,
        int $pixelWidth,
    ): bool {
        $fileName = $this->fileNameCompiler->forResizeToWidth(
            pathOrUrl: $pathOrUrl,
            pixelWidth: $pixelWidth,
        );

        return $this->imageCacheFileSystem->has($fileName);
    }

    public function resizeToWidthByQueue(
        string $pathOrUrl,
        int $pixelWidth,
        bool $returnOriginalIfNotExists = true,
    ): string|null {
        $fileName = $this->fileNameCompiler->forResizeToWidth(
            pathOrUrl: $pathOrUrl,
            pixelWidth: $pixelWidth,
        );

        if (! $this->imageCacheFileSystem->has($fileName)) {
            $this->pushToQueueIfNotInQueue->push(
                pathOrUrl: $pathOrUrl,
                pixelWidthOrHeight: $pixelWidth,
                class: ResizeImageByWidthQueueJob::class,
            );

            if (! $returnOriginalIfNotExists) {
                return null;
            }

            return $this->urlGenerator->generateIfNotFullyQualified(
                $pathOrUrl,
            );
        }

        return $this->urlGenerator->generateIfNotFullyQualified(
            'imagecache/' . $fileName,
        );
    }

    public function resizeToHeightExists(
        string $pathOrUrl,
        int $pixelHeight,
    ): bool {
        $fileName = $this->fileNameCompiler->forResizeToHeight(
            pathOrUrl: $pathOrUrl,
            pixelHeight: $pixelHeight,
        );

        return $this->imageCacheFileSystem->has($fileName);
    }

    public function resizeToHeightByQueue(
        string $pathOrUrl,
        int $pixelHeight,
        bool $returnOriginalIfNotExists = true,
    ): string|null {
        $fileName = $this->fileNameCompiler->forResizeToHeight(
            pathOrUrl: $pathOrUrl,
            pixelHeight: $pixelHeight,
        );

        if (! $this->imageCacheFileSystem->has($fileName)) {
            $this->pushToQueueIfNotInQueue->push(
                pathOrUrl: $pathOrUrl,
                pixelWidthOrHeight: $pixelHeight,
                class: ResizeImageByHeightQueueJob::class,
            );

            if (! $returnOriginalIfNotExists) {
                return null;
            }

            return $this->urlGenerator->generateIfNotFullyQualified(
                $pathOrUrl,
            );
        }

        return $this->urlGenerator->generateIfNotFullyQualified(
            'imagecache/' . $fileName,
        );
    }
}
