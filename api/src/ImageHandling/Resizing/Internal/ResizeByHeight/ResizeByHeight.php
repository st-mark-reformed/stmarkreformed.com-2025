<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByHeight;

interface ResizeByHeight
{
    public function resize(
        string $targetFileName,
        int $pixelHeight,
    ): void;
}
