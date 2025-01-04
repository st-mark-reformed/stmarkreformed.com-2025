<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByHeight;

use App\Files\ImageCacheFileSystem;
use App\Files\RemoteSplFileInfo;
use App\Files\TempFilesFileSystem;
use App\ImageHandling\Resizing\Internal\GumletImageResizeFactory;
use SplFileInfo;

use function ltrim;

readonly class ResizeRemoteFileByHeight implements ResizeByHeight
{
    public function __construct(
        private RemoteSplFileInfo $sourceFileInfo,
        private TempFilesFileSystem $tempFilesFileSystem,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private GumletImageResizeFactory $imageResizeFactory,
    ) {
    }

    public function resize(string $targetFileName, int $pixelHeight): void
    {
        $fullCacheTarget = $this->tempFilesFileSystem->adapter->prefixer->prefixPath(
            ltrim(
                $targetFileName,
                '/',
            ),
        );

        $finalTarget = $this->imageCacheFileSystem->adapter->prefixer->prefixPath(
            ltrim(
                $targetFileName,
                '/',
            ),
        );

        if ($this->tempFilesFileSystem->has($targetFileName)) {
            $this->tempFilesFileSystem->delete($targetFileName);
        }

        $this->tempFilesFileSystem->write(
            $targetFileName,
            $this->sourceFileInfo->getContent(),
        );

        $targetInfo = new SplFileInfo($targetFileName);

        $this->imageCacheFileSystem->createDirectory(
            $targetInfo->getPath(),
        );

        $imageResize = $this->imageResizeFactory->make(
            filename: $fullCacheTarget,
        );

        $imageResize->resizeToHeight($pixelHeight);

        $imageResize->save($finalTarget);

        $this->tempFilesFileSystem->delete($targetFileName);

        $this->tempFilesFileSystem->deleteDirectory(
            $targetInfo->getPath(),
        );
    }
}
