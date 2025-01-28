<?php

declare(strict_types=1);

namespace App\BlogEntries\PostNewEntry;

use App\BlogEntries\EntryRepository;
use App\Persistence\Result;

readonly class CreateEntry
{
    public function __construct(private EntryRepository $repository)
    {
    }

    public function create(
        EntryDataResult $entryDataResult,
    ): Result {
        if (! $entryDataResult->isValid) {
            return new Result(
                false,
                $entryDataResult->errors,
            );
        }

        return $this->repository->createNewEntry(
            $entryDataResult->blogPageId,
            $entryDataResult->entryName,
        );
    }
}
