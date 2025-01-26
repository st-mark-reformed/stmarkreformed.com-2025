<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\BlogEntries\Entry\Entry;
use App\BlogEntries\Entry\EntryCollection;
use App\BlogEntries\Entry\EntryType;
use App\Pages\Page\Page;
use App\Pages\Page\PageCollection;
use App\Pages\Page\PageData;
use App\Pages\Page\PageJson;
use App\Pages\Page\PageName;
use App\Pages\Page\PagePath;
use App\Pages\Page\PageSlug;
use App\Pages\Page\PageStatus;
use App\Profiles\Profile\Profile;
use App\Profiles\Profile\ProfileCollection;
use DateTimeImmutable;
use Ramsey\Uuid\Uuid;
use RuntimeException;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class EntryRecordToEntity
{
    public function transformCollection(
        EntryRecordCollection $collection,
        PageCollection $blogPages,
        ProfileCollection $authors,
    ): EntryCollection {
        /** @phpstan-ignore-next-line */
        return new EntryCollection($collection->map(
            function (EntryRecord $record) use (
                $blogPages,
                $authors,
            ): Entry {
                return $this->transformRecord(
                    $record,
                    $blogPages->getOneById(
                        Uuid::fromString($record->blog_page_id),
                    ),
                    $authors->getOneById(
                        Uuid::fromString($record->author_profile_id),
                    ),
                );
            },
        ));
    }

    public function transformRecord(
        EntryRecord $record,
        Page $blogPage,
        Profile $author,
    ): Entry {
        if ($blogPage->id->toString() !== $record->blog_page_id) {
            throw new RuntimeException(
                'The blog page ID must match the entry record',
            );
        }

        if ($author->id->toString() !== $record->author_profile_id) {
            throw new RuntimeException(
                'The author profile ID must match the entry record',
            );
        }

        $datePublished = DateTimeImmutable::createFromFormat(
            'Y-m-d H:i:s',
            $record->date_published,
        );

        if ($datePublished === false) {
            throw new RuntimeException(
                'Unable to create datePublished',
            );
        }

        return new Entry(
            Uuid::fromString($record->id),
            $blogPage,
            $author,
            new PageName($record->name),
            new PageSlug($record->slug),
            new PagePath($record->path),
            PageStatus::fromString($record->status),
            EntryType::fromString($record->type),
            new PageData($record->data),
            new PageJson($record->json),
            $datePublished,
        );
    }
}
