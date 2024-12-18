<?php

declare(strict_types=1);

namespace App\Pages\PatchPagesPosition;

use function array_map;
use function array_values;

readonly class PageCollection
{
    /** @var Page[] */
    private array $pages;

    /** @param Page[] $pages */
    public function __construct(array $pages = [])
    {
        $this->pages = array_values(array_map(
            static fn (Page $p) => $p,
            $pages,
        ));
    }

    public function walk(callable $callback): void
    {
        array_map($callback, $this->pages);
    }
}
