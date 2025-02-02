<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use App\BlogEntries\EntryResult;

readonly class ResponderFactory
{
    public function createResponder(
        EntryIds $entryIds,
        EntryResult $entryResult,
    ): Responder {
        if (
            ! $entryResult->hasEntry ||
            ! $entryResult->entry->blogPage->id->equals(
                $entryIds->blogPageId,
            )
        ) {
            return new RespondWith404();
        }

        return new RespondWithResult($entryResult->entry);
    }
}
