<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByHeight;

use App\Files\ImageCacheFileSystem;
use App\Files\RemoteSplFileInfo;
use App\Files\TempFilesFileSystem;
use App\ImageHandling\Resizing\Internal\GumletImageResizeFactory;
use SplFileInfo;

readonly class ResizeByHeightFactory
{
    public function __construct(
        private TempFilesFileSystem $tempFilesFileSystem,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private GumletImageResizeFactory $imageResizeFactory,
    ) {
    }

    public function make(SplFileInfo $sourceFileInfo): ResizeByHeight
    {
        if ($sourceFileInfo instanceof RemoteSplFileInfo) {
            return new ResizeRemoteFileByHeight(
                sourceFileInfo: $sourceFileInfo,
                imageResizeFactory: $this->imageResizeFactory,
                tempFilesFileSystem: $this->tempFilesFileSystem,
                imageCacheFileSystem: $this->imageCacheFileSystem,
            );
        }

        return new ResizeLocalFileByHeight(
            sourceFileInfo: $sourceFileInfo,
            imageResizeFactory: $this->imageResizeFactory,
            imageCacheFileSystem: $this->imageCacheFileSystem,
        );
    }
}
