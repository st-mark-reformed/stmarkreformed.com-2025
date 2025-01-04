<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByHeight;

use JetBrains\PhpStorm\ArrayShape;

readonly class ResizeImageByHeightQueueJob
{
    public function __construct(private ResizeImageByHeight $resizeImageByHeight)
    {
    }

    /** @param scalar[] $params */
    public function __invoke(
        #[ArrayShape([
            'pathOrUrl' => 'string',
            'pixelHeight' => 'int',
        ])]
        array $params,
    ): void {
        $this->resizeImageByHeight->resize(
            pathOrUrl: (string) $params['pathOrUrl'],
            pixelHeight: (int) $params['pixelHeight'],
        );
    }
}
