<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use App\Pages\Page\PageName;
use App\Pages\Page\PageStatus;
use App\Pages\Page\PageType;
use App\Persistence\UuidFactoryWithOrderedTimeCodec;
use Cocur\Slugify\Slugify;

readonly class CreateNewPageRecord
{
    public function __construct(
        private Slugify $slugify,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function fromName(
        PageName $pageName,
        int $lastPagePosition,
    ): PageRecord {
        $record = new PageRecord();

        $record->id = $this->uuidFactory->uuid1()->toString();

        $record->name = $pageName->value;

        $record->slug = $this->slugify->slugify($record->name);

        $record->path = $record->slug;

        $record->status = PageStatus::unpublished->name;

        $record->type = PageType::page->name;

        $record->position = $lastPagePosition + 1;

        return $record;
    }
}
