<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use function array_filter;
use function array_map;
use function array_values;

readonly class EntryRecordCollection
{
    /** @var EntryRecord[] */
    public array $records;

    /** @param EntryRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (EntryRecord $r) => $r,
            $records,
        ));
    }

    public function filter(callable $callback): EntryRecordCollection
    {
        return new EntryRecordCollection(array_filter(
            $this->records,
            $callback,
        ));
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_map($callback, $this->records);
    }
}
