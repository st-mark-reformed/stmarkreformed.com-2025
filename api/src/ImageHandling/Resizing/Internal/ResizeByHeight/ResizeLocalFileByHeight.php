<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByHeight;

use App\Files\ImageCacheFileSystem;
use App\ImageHandling\Resizing\Internal\GumletImageResizeFactory;
use SplFileInfo;

use function ltrim;

readonly class ResizeLocalFileByHeight implements ResizeByHeight
{
    public function __construct(
        private SplFileInfo $sourceFileInfo,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private GumletImageResizeFactory $imageResizeFactory,
    ) {
    }

    public function resize(string $targetFileName, int $pixelHeight): void
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

        $imageResize->resizeToHeight($pixelHeight);

        $imageResize->save($finalTarget);
    }
}
