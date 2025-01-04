<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal;

use Gumlet\ImageResize;
use Gumlet\ImageResizeException;

readonly class GumletImageResizeFactory
{
    /** @throws ImageResizeException */
    public function make(string $filename): ImageResize
    {
        return new ImageResize($filename);
    }
}
