<?php

declare(strict_types=1);

namespace App\BlogEntries;

use App\BlogEntries\Entry\Entry;
use App\BlogEntries\Entry\EntryCollection;
use App\BlogEntries\Persistence\CreateNewEntryRecord;
use App\BlogEntries\Persistence\EntryRecordToEntity;
use App\BlogEntries\Persistence\FindEntries;
use App\BlogEntries\Persistence\OrderBy;
use App\Pages\Page\PageName;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use App\Persistence\PersistNewRecord;
use App\Persistence\Result;
use App\Persistence\Sort;
use App\Persistence\UuidCollection;
use App\Profiles\ProfileRepository;
use Ramsey\Uuid\UuidInterface;

readonly class EntryRepository
{
    public function __construct(
        private FindEntries $findEntries,
        private PageRepository $pageRepository,
        private PersistNewRecord $persistNewRecord,
        private ProfileRepository $profileRepository,
        private EntryRecordToEntity $entryRecordToEntity,
        private CreateNewEntryRecord $createNewEntryRecord,
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

    public function createNewEntry(
        UuidInterface $blogPageId,
        PageName $entryName,
    ): Result {
        $blogPageResult = $this->pageRepository->findAllPages()
            ->findAllByPageType(PageType::blog_entries)
            ->findOneById(
                $blogPageId,
            );

        if (! $blogPageResult->hasPage) {
            return new Result(
                false,
                ['Invalid blogPageId'],
            );
        }

        $record = $this->createNewEntryRecord->fromName(
            $blogPageResult->page,
            $entryName,
        );

        return $this->persistNewRecord->persist($record);
    }
}
