<?php

declare(strict_types=1);

namespace App\Pages;

use App\Pages\Page\PageCollection;
use App\Pages\Page\PageName;
use App\Pages\Persistence\CreateNewPageRecord;
use App\Pages\Persistence\FindAllPages;
use App\Pages\Persistence\PageRecordToEntity;
use App\Persistence\PersistNewRecord;
use App\Persistence\Result;

readonly class PageRepository
{
    public function __construct(
        private FindAllPages $findAllPages,
        private PersistNewRecord $persistNewRecord,
        private PageRecordToEntity $pageRecordToEntity,
        private CreateNewPageRecord $createNewPageRecord,
    ) {
    }

    public function findAllPages(): PageCollection
    {
        return $this->pageRecordToEntity->transformCollectionFromRoot(
            $this->findAllPages->find(),
        );
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
