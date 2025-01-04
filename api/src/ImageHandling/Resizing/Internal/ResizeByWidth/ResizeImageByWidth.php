<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByWidth;

use App\Files\ImageCacheFileSystem;
use App\ImageHandling\Resizing\Internal\FileNameCompiler;
use App\ImageHandling\Resizing\Internal\SourceFileRetriever;
use Spatie\ImageOptimizer\OptimizerChain;

use function ltrim;

readonly class ResizeImageByWidth
{
    public function __construct(
        private OptimizerChain $optimizerChain,
        private FileNameCompiler $fileNameCompiler,
        private SourceFileRetriever $sourceFileRetriever,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private ResizeByWidthFactory $resizeByWidthFactory,
    ) {
    }

    public function __invoke(
        string $pathOrUrl,
        int $pixelWidth,
    ): void {
        $this->resize(
            pathOrUrl: $pathOrUrl,
            pixelWidth: $pixelWidth,
        );
    }

    public function resize(
        string $pathOrUrl,
        int $pixelWidth,
    ): void {
        $sourceFileInfo = $this->sourceFileRetriever->retrieveInfo(
            pathOrUrl: $pathOrUrl,
        );

        $targetFileName = $this->fileNameCompiler->forResizeToWidth(
            pathOrUrl: $pathOrUrl,
            pixelWidth: $pixelWidth,
        );

        $finalTarget = $this->imageCacheFileSystem->adapter->prefixer->prefixPath(
            ltrim(
                $targetFileName,
                '/',
            ),
        );

        $this->resizeByWidthFactory->make(
            sourceFileInfo: $sourceFileInfo,
        )->resize(
            targetFileName: $targetFileName,
            pixelWidth: $pixelWidth,
        );

        $this->optimizerChain->optimize($finalTarget);
    }
}
