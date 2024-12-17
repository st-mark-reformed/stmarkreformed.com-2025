<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use function array_filter;
use function array_map;
use function array_values;

// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class PageRecordCollection
{
    /** @var PageRecord[] */
    public array $records;

    /** @param PageRecord[] $records */
    public function __construct(array $records = [])
    {
        $this->records = array_values(array_map(
            static fn (PageRecord $r) => $r,
            $records,
        ));
    }

    public function filter(callable $callback): PageRecordCollection
    {
        return new PageRecordCollection(array_filter(
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
