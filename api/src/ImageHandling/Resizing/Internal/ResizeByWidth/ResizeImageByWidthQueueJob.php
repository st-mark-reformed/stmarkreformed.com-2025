<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByWidth;

use JetBrains\PhpStorm\ArrayShape;

readonly class ResizeImageByWidthQueueJob
{
    public function __construct(private ResizeImageByWidth $resizeImageByWidth)
    {
    }

    /** @param scalar[] $params */
    public function __invoke(
        #[ArrayShape([
            'pathOrUrl' => 'string',
            'pixelWidth' => 'int',
        ])]
        array $params,
    ): void {
        $this->resizeImageByWidth->resize(
            pathOrUrl: (string) $params['pathOrUrl'],
            pixelWidth: (int) $params['pixelWidth'],
        );
    }
}
