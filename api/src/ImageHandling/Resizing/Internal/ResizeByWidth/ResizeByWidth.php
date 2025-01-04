<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal\ResizeByWidth;

interface ResizeByWidth
{
    public function resize(
        string $targetFileName,
        int $pixelWidth,
    ): void;
}
