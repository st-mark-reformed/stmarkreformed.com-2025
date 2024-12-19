<?php

declare(strict_types=1);

namespace App\ImageHandling;

use Symfony\Component\Finder\Finder;

readonly class FinderFactory
{
    public function create(): Finder
    {
        return new Finder();
    }
}
