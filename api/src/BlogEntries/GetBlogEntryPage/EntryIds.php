<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use Ramsey\Uuid\UuidInterface;

readonly class EntryIds
{
    public function __construct(
        public UuidInterface $blogPageId,
        public UuidInterface $entryId,
    ) {
    }
}
