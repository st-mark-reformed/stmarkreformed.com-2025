<?php

declare(strict_types=1);

namespace App\Pages;

use App\Pages\OverlappingUrisReport\OverlappingUri;
use App\Pages\OverlappingUrisReport\OverlappingUrisReport;
use App\Pages\Page\Page;
use App\Pages\Page\PageCollection;
use App\Pages\Page\PageName;
use App\Pages\Persistence\CreateNewPageRecord;
use App\Pages\Persistence\DeletePages;
use App\Pages\Persistence\FindAllPages;
use App\Pages\Persistence\PageRecordToEntity;
use App\Persistence\PersistNewRecord;
use App\Persistence\Result;
use App\Persistence\UuidCollection;

use function array_filter;
use function array_key_exists;

readonly class PageRepository
{
    public function __construct(
        private DeletePages $deletePages,
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

    public function createOverlappingUriReport(): OverlappingUrisReport
    {
        $uriCounts = [];

        $this->findAllPages()->walkAll(
            static function (Page $page) use (&$uriCounts): void {
                $uri = $page->path->value;

                if (! array_key_exists($uri, $uriCounts)) {
                    $uriCounts[$uri] = 0;
                }

                $uriCounts[$uri] += 1;
            },
        );

        $uriCounts = array_filter(
            $uriCounts,
            static fn (int $count) => $count > 1,
        );

        $items = [];

        foreach ($uriCounts as $uri => $count) {
            $items[] = new OverlappingUri($uri, $count);
        }

        return new OverlappingUrisReport($items);
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

    public function deletePages(UuidCollection $ids): Result
    {
        $allPages = $this->findAllPages();

        $allPages->walkAll(
            static function (Page $page) use (&$ids): void {
                if (! $ids->has($page->parentId)) {
                    return;
                }

                $ids = $ids->withId($page->id);
            },
        );

        return $this->deletePages->delete($ids);
    }
}
