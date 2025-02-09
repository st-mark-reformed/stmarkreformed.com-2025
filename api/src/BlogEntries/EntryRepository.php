<?php

declare(strict_types=1);

namespace App\BlogEntries;

use App\BlogEntries\Entry\Entry;
use App\BlogEntries\Entry\EntryCollection;
use App\BlogEntries\Persistence\CreateNewEntryRecord;
use App\BlogEntries\Persistence\EntryEntityToRecord;
use App\BlogEntries\Persistence\EntryRecord;
use App\BlogEntries\Persistence\EntryRecordToEntity;
use App\BlogEntries\Persistence\FindEntries;
use App\BlogEntries\Persistence\OrderBy;
use App\BlogEntries\Persistence\OrderBySort;
use App\BlogEntries\Persistence\OrderBySortCollection;
use App\BlogEntries\Persistence\ValidateEntryForPersistence;
use App\EmptyUuid;
use App\Generator\EnqueueGenerateSiteData;
use App\Pages\Page\PageName;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use App\Persistence\FindRecordById;
use App\Persistence\PersistNewRecord;
use App\Persistence\PersistRecord;
use App\Persistence\Result;
use App\Persistence\Sort;
use App\Persistence\UuidCollection;
use App\Profiles\ProfileRepository;
use Ramsey\Uuid\Exception\InvalidUuidStringException;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use Throwable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class EntryRepository
{
    public function __construct(
        private FindEntries $findEntries,
        private PersistRecord $persistRecord,
        private FindRecordById $findRecordById,
        private PageRepository $pageRepository,
        private PersistNewRecord $persistNewRecord,
        private ProfileRepository $profileRepository,
        private EntryRecordToEntity $entryRecordToEntity,
        private EntryEntityToRecord $entryEntityToRecord,
        private CreateNewEntryRecord $createNewEntryRecord,
        private EnqueueGenerateSiteData $enqueueGenerateSiteData,
        private ValidateEntryForPersistence $validateEntryForPersistence,
    ) {
    }

    public function findEntries(
        UuidInterface $blogPageId = new EmptyUuid(),
        int $limit = 0,
        int $offset = 0,
        OrderBySortCollection $ordering = new OrderBySortCollection([
            new OrderBySort(
                orderBy: OrderBy::status,
                sort: Sort::DESC,
            ),
            new OrderBySort(
                orderBy: OrderBy::date_published,
                sort: Sort::DESC,
            ),
        ]),
    ): EntryCollection {
        $pages = $this->pageRepository->findAllPages()->findAllByPageType(
            PageType::blog_entries,
        );

        $blogPageResult = $pages->findOneById($blogPageId);

        if (! $blogPageResult->hasPage) {
            return new EntryCollection();
        }

        $entries = $this->findEntries->find(
            $blogPageId,
            $limit,
            $offset,
            $ordering,
        );

        $entriesWithAuthorProfileIds = $entries->filter(
            static fn (EntryRecord $r) => $r->author_profile_id !== '',
        );

        $authors = $this->profileRepository->findProfilesByIds(
            /** @phpstan-ignore-next-line */
            new UuidCollection($entriesWithAuthorProfileIds->map(
                static fn (EntryRecord $e) => Uuid::fromString(
                    $e->author_profile_id,
                ),
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

    public function findEntry(string|UuidInterface $id): EntryResult
    {
        try {
            $id = $id instanceof UuidInterface ? $id : Uuid::fromString(
                $id,
            );
        } catch (InvalidUuidStringException) {
            return new EntryResult(
                null,
                ['Invalid ID provided'],
            );
        }

        $recordResult = $this->findRecordById->find(
            $id,
            EntryRecord::class,
        );

        if (
            ! $recordResult->hasRecord ||
            ! ($recordResult->record instanceof EntryRecord)
        ) {
            return new EntryResult();
        }

        try {
            $blogPageResult = $this->pageRepository->findAllPages()
                ->findAllByPageType(
                    PageType::blog_entries,
                )->findOneById(Uuid::fromString(
                    $recordResult->record->blog_page_id,
                ));

            if (! $blogPageResult->hasPage) {
                return new EntryResult();
            }

            $blogPage = $blogPageResult->page;
        } catch (Throwable) {
            return new EntryResult();
        }

        $author = null;

        if ($recordResult->record->author_profile_id !== '') {
            try {
                $authorResult = $this->profileRepository->findProfileById(
                    Uuid::fromString(
                        $recordResult->record->author_profile_id,
                    ),
                );

                if ($authorResult->hasProfile) {
                    $author = $authorResult->profile;
                }
            } catch (Throwable) {
            }
        }

        return new EntryResult(
            $this->entryRecordToEntity->transformRecord(
                $recordResult->record,
                $blogPage,
                $author,
            ),
        );
    }

    public function persistEntry(Entry $entry): Result
    {
        $validationResult = $this->validateEntryForPersistence->validate(
            $entry,
        );

        if (! $validationResult->success) {
            return $validationResult;
        }

        $record = $this->entryEntityToRecord->processEntryEntity($entry);

        $result = $this->persistRecord->persist($record);

        $this->enqueueGenerateSiteData->enqueue();

        return $result;
    }
}
