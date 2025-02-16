<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\Persistence\SqlCompilation;

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

    public function compileIntoSql(SqlCompilation $sql): SqlCompilation
    {
        if (! $this->hasItems()) {
            return $sql;
        }

        $orderStatement = [];

        foreach ($this->items as $item) {
            $orderStatement[] = $item->orderBy->name . ' ' . $item->sort->name;
        }

        return $sql->withAddToStatement(
            'ORDER BY ' . implode(
                ', ',
                $orderStatement,
            ),
        );
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
