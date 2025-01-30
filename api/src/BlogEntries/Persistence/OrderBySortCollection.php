<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use function array_map;
use function array_values;
use function count;
use function implode;

readonly class OrderBySortCollection
{
    /** @var OrderBySort[] $items */
    public array $items;

    /** @param OrderBySort[] $items */
    public function __construct(array $items)
    {
        $this->items = array_values(array_map(
            static fn (OrderBySort $i) => $i,
            $items,
        ));
    }

    /**
     * @param string[] $sql
     *
     * @return string[]
     */
    public function compileIntoSqlArray(array $sql): array
    {
        if (! $this->hasItems()) {
            return $sql;
        }

        $orderStatement = [];

        foreach ($this->items as $item) {
            $orderStatement[] = $item->orderBy->name . ' ' . $item->sort->name;
        }

        $sql[] = 'ORDER BY ' . implode(', ', $orderStatement);

        return $sql;
    }

    public function walk(callable $callback): void
    {
        array_map(
            $callback,
            $this->items,
        );
    }

    public function count(): int
    {
        return count($this->items);
    }

    public function hasItems(): bool
    {
        return $this->count() > 0;
    }
}
