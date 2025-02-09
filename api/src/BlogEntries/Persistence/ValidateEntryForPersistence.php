<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\BlogEntries\Entry\Entry;
use App\Persistence\Result;

readonly class ValidateEntryForPersistence
{
    public function validate(Entry $entry): Result
    {
        if ($entry->status->isPublished() && $entry->datePublished === null) {
            return new Result(
                false,
                ['Live entries must have a publish date'],
            );
        }

        return new Result(true, []);
    }
}
