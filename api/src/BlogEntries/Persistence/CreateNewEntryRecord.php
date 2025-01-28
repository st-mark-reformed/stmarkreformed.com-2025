<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\BlogEntries\Entry\EntryType;
use App\Pages\Page\Page;
use App\Pages\Page\PageName;
use App\Pages\Page\PageStatus;
use App\Persistence\UuidFactoryWithOrderedTimeCodec;
use Cocur\Slugify\Slugify;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class CreateNewEntryRecord
{
    public function __construct(
        private Slugify $slugify,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function fromName(
        Page $blogPage,
        PageName $entryName,
    ): EntryRecord {
        $record = new EntryRecord();

        $record->id = $this->uuidFactory->uuid1()->toString();

        $record->blog_page_id = $blogPage->id->toString();

        $record->name = $entryName->value;

        $record->slug = $this->slugify->slugify($record->name);

        $record->path = $blogPage->path->value . '/' . $record->slug;

        $record->status = PageStatus::unpublished->name;

        $record->type = EntryType::entry->name;

        return $record;
    }
}
