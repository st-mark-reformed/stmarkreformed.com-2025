<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByHeight;

use App\Files\ImageCacheFileSystem;
use App\ImageHandling\Resizing\Internal\FileNameCompiler;
use App\ImageHandling\Resizing\Internal\SourceFileRetriever;
use Spatie\ImageOptimizer\OptimizerChain;

use function ltrim;

readonly class ResizeImageByHeight
{
    public function __construct(
        private OptimizerChain $optimizerChain,
        private FileNameCompiler $fileNameCompiler,
        private SourceFileRetriever $sourceFileRetriever,
        private ImageCacheFileSystem $imageCacheFileSystem,
        private ResizeByHeightFactory $resizeByHeightFactory,
    ) {
    }

    public function __invoke(
        string $pathOrUrl,
        int $pixelHeight,
    ): void {
        $this->resize(
            pathOrUrl: $pathOrUrl,
            pixelHeight: $pixelHeight,
        );
    }

    public function resize(
        string $pathOrUrl,
        int $pixelHeight,
    ): void {
        $sourceFileInfo = $this->sourceFileRetriever->retrieveInfo(
            pathOrUrl: $pathOrUrl,
        );

        $targetFileName = $this->fileNameCompiler->forResizeToHeight(
            pathOrUrl: $pathOrUrl,
            pixelHeight: $pixelHeight,
        );

        $finalTarget = $this->imageCacheFileSystem->adapter->prefixer->prefixPath(
            ltrim(
                $targetFileName,
                '/',
            ),
        );

        $this->resizeByHeightFactory->make(
            sourceFileInfo: $sourceFileInfo,
        )->resize(
            targetFileName: $targetFileName,
            pixelHeight: $pixelHeight,
        );

        $this->optimizerChain->optimize($finalTarget);
    }
}
