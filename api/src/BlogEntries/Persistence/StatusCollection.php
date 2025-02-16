<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\Pages\Page\PageStatus;
use App\Persistence\SqlCompilation;

use function array_map;
use function array_values;
use function count;
use function implode;

readonly class StatusCollection
{
    /** @var PageStatus[] */
    public array $statuses;

    /** @param PageStatus[] $statuses $items */
    public function __construct(array $statuses)
    {
        $this->statuses = array_values(array_map(
            static fn (PageStatus $s) => $s,
            $statuses,
        ));
    }

    public function compileIntoSql(SqlCompilation $sql): SqlCompilation
    {
        if (! $this->hasStatuses()) {
            return $sql;
        }

        if ($this->count() === 1) {
            return $sql->withAddToStatement(
                'AND status = "' . $this->first()->name . '"',
            );
        }

        $in = implode(', ', array_map(
            static fn (PageStatus $s) => "'" . $s->name . "'",
            $this->statuses,
        ));

        return $sql->withAddToStatement(
            'AND status IN (' . $in . ')',
        );
    }

    public function count(): int
    {
        return count($this->statuses);
    }

    public function hasStatuses(): bool
    {
        return $this->count() > 0;
    }

    public function first(): PageStatus
    {
        return $this->statuses[0];
    }
}
