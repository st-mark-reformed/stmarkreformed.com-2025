<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByWidth;

use App\Files\ImageCacheFileSystem;
use App\ImageHandling\Resizing\Internal\GumletImageResizeFactory;
use SplFileInfo;

use function ltrim;

readonly class ResizeLocalFileByWidth implements ResizeByWidth
{
    public function __construct(
        private SplFileInfo $sourceFileInfo,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private GumletImageResizeFactory $imageResizeFactory,
    ) {
    }

    public function resize(string $targetFileName, int $pixelWidth): void
    {
        $finalTarget = $this->imageCacheFileSystem->adapter->prefixer->prefixPath(
            ltrim(
                $targetFileName,
                '/',
            ),
        );

        $targetInfo = new SplFileInfo($targetFileName);

        $this->imageCacheFileSystem->createDirectory(
            $targetInfo->getPath(),
        );

        $imageResize = $this->imageResizeFactory->make(
            filename: $this->sourceFileInfo->getPathname(),
        );

        $imageResize->resizeToWidth($pixelWidth);

        $imageResize->save($finalTarget);
    }
}
