<?php

declare(strict_types=1);

namespace App\Persistence;

use function array_merge;
use function array_values;
use function ceil;

readonly class CountResult
{
    public function __construct(public int $total)
    {
    }

    public function calculateTotalPages(int $perPage): int
    {
        return (int) ceil($this->total / $perPage);
    }

    /** @param mixed[] $arguments any arguments you want to send to the callback in addition to the page number */
    public function walkTotalPages(
        int $perPage,
        callable $callback,
        array $arguments,
    ): void {
        $totalPages = $this->calculateTotalPages($perPage);

        for ($page = 1; $page <= $totalPages; $page++) {
            $pageArguments = array_values(array_merge(
                [
                    $page,
                    $totalPages,
                    $this->total,
                ],
                $arguments,
            ));

            $callback(...$pageArguments);
        }
    }
}
