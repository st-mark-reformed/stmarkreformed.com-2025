<?php

declare(strict_types=1);

namespace App\BlogEntries;

use App\BlogEntries\Entry\Entry;
use App\BlogEntries\Entry\EntryCollection;
use App\BlogEntries\Persistence\EntryRecordToEntity;
use App\BlogEntries\Persistence\FindEntries;
use App\BlogEntries\Persistence\OrderBy;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use App\Persistence\Sort;
use App\Persistence\UuidCollection;
use App\Profiles\ProfileRepository;

readonly class EntryRepository
{
    public function __construct(
        private FindEntries $findEntries,
        private PageRepository $pageRepository,
        private ProfileRepository $profileRepository,
        private EntryRecordToEntity $entryRecordToEntity,
    ) {
    }

    public function findEntries(
        int $limit = 0,
        int $offset = 0,
        OrderBy $orderBy = OrderBy::date_published,
        Sort $sort = Sort::DESC,
    ): EntryCollection {
        $entries = $this->findEntries->find(
            $limit,
            $offset,
            $orderBy,
            $sort,
        );

        $pages = $this->pageRepository->findAllPages()->findAllByPageType(
            PageType::blog_entries,
        );

        $authors = $this->profileRepository->findProfilesByIds(
            /** @phpstan-ignore-next-line */
            new UuidCollection($entries->map(
                static fn (Entry $e) => $e->id,
            )),
        );

        return $this->entryRecordToEntity->transformCollection(
            $entries,
            $pages,
            $authors,
        );
    }
}
