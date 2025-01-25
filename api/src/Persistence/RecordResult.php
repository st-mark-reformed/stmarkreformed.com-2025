<?php

declare(strict_types=1);

namespace App\Persistence;

readonly class RecordResult
{
    public bool $hasRecord;

    public Record $record;

    /** @param class-string<Record> $recordClass */
    public function __construct(
        Record|null $record,
        string $recordClass,
    ) {
        $this->hasRecord = $record !== null;

        $this->record = $record ?? new $recordClass();
    }
}
