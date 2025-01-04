<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByWidth;

use App\Files\ImageCacheFileSystem;
use App\Files\RemoteSplFileInfo;
use App\Files\TempFilesFileSystem;
use App\ImageHandling\Resizing\Internal\GumletImageResizeFactory;
use SplFileInfo;

readonly class ResizeByWidthFactory
{
    public function __construct(
        private TempFilesFileSystem $tempFilesFileSystem,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private GumletImageResizeFactory $imageResizeFactory,
    ) {
    }

    public function make(SplFileInfo $sourceFileInfo): ResizeByWidth
    {
        if ($sourceFileInfo instanceof RemoteSplFileInfo) {
            return new ResizeRemoteFileByWidth(
                sourceFileInfo: $sourceFileInfo,
                imageResizeFactory: $this->imageResizeFactory,
                tempFilesFileSystem: $this->tempFilesFileSystem,
                imageCacheFileSystem: $this->imageCacheFileSystem,
            );
        }

        return new ResizeLocalFileByWidth(
            sourceFileInfo: $sourceFileInfo,
            imageResizeFactory: $this->imageResizeFactory,
            imageCacheFileSystem: $this->imageCacheFileSystem,
        );
    }
}
