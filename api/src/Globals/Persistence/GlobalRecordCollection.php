<?php

declare(strict_types=1);

namespace App\Globals\Persistence;

use function array_filter;
use function array_map;
use function array_values;

readonly class GlobalRecordCollection
{
    /** @var GlobalRecord[] */
    public array $records;

    /** @param GlobalRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (GlobalRecord $r) => $r,
            $records,
        ));
    }

    public function filter(callable $callback): GlobalRecordCollection
    {
        return new GlobalRecordCollection(array_filter(
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
