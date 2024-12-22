<?php

declare(strict_types=1);

namespace App\Globals\Global;

use function array_map;
use function array_values;

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
}
