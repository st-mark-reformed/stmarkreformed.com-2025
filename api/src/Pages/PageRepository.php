<?php

declare(strict_types=1);

namespace App\Pages;

use App\Pages\Page\PageCollection;
use App\Pages\Page\PageName;
use App\Pages\Persistence\CreateNewPageRecord;
use App\Persistence\PersistNewRecord;
use App\Persistence\Result;

readonly class PageRepository
{
    public function __construct(
        private PersistNewRecord $persistNewRecord,
        private CreateNewPageRecord $createNewPageRecord,
    ) {
    }

    public function findAllPages(): PageCollection
    {
        // TODO: Implement findAllPages method
        return new PageCollection();
    }

    public function createNewPage(PageName $pageName): Result
    {
        $existingPages = $this->findAllPages();

        return $this->persistNewRecord->persist(
            $this->createNewPageRecord->fromName(
                $pageName,
                $existingPages->lastPagePosition(),
            ),
        );
    }
}
