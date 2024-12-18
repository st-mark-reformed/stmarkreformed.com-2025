<?php

declare(strict_types=1);

namespace App\Pages\OverlappingUrisReport;

readonly class OverlappingUri
{
    public function __construct(public string $uri, public int $count)
    {
    }

    /** @return array<string, scalar> */
    public function asArray(): array
    {
        return [
            'uri' => $this->uri,
            'count' => $this->count,
        ];
    }
}
