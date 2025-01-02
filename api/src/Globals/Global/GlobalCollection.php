<?php

declare(strict_types=1);

namespace App\Globals\Global;

use function array_filter;
use function array_map;
use function array_values;
use function array_walk;

readonly class GlobalCollection
{
    /** @var GlobalItem[] */
    private array $globals;

    /** @param GlobalItem[] $globals */
    public function __construct(array $globals = [])
    {
        $this->globals = array_values(array_map(
            static fn (GlobalItem $g) => $g,
            $globals,
        ));
    }

    /** @return mixed[] */
    public function asScalarArray(): array
    {
        return array_map(
            static fn (GlobalItem $g) => $g->asScalarArray(),
            $this->globals,
        );
    }

    public function walkAll(callable $callback): void
    {
        $globals = $this->globals;

        array_walk($globals, $callback);
    }

    public function filter(callable $callback): GlobalCollection
    {
        return new GlobalCollection(array_filter(
            $this->globals,
            $callback,
        ));
    }

    public function first(): GlobalItem
    {
        return $this->globals[0];
    }

    public function getBySlug(string $slug): GlobalItem
    {
        return $this->filter(
            static fn (GlobalItem $i) => $i->slug->value === $slug,
        )->first();
    }
}
