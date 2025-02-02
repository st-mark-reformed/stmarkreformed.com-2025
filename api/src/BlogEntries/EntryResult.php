<?php

declare(strict_types=1);

namespace App\BlogEntries;

use App\BlogEntries\Entry\Entry;

use function count;

readonly class EntryResult
{
    public bool $hasEntry;

    public bool $hasErrors;

    public Entry $entry;

    /** @param string[] $errors */
    public function __construct(
        Entry|null $entry = null,
        public array $errors = [],
    ) {
        $this->hasEntry = $entry !== null;

        $this->hasErrors = count($errors) > 0;

        $this->entry = $entry ?? new Entry();
    }
}
