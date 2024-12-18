<?php

declare(strict_types=1);

namespace App\Pages\OverlappingUrisReport;

use function array_map;
use function array_walk;

readonly class OverlappingUrisReport
{
    /** @param OverlappingUri[] $uris */
    public function __construct(public array $uris)
    {
        array_walk(
            $uris,
            static fn (OverlappingUri $uri) => $uri,
        );
    }

    /** @return array<array-key, array<string, scalar>> */
    public function asArray(): array
    {
        return array_map(
            static fn (OverlappingUri $uri) => $uri->asArray(),
            $this->uris,
        );
    }
}
