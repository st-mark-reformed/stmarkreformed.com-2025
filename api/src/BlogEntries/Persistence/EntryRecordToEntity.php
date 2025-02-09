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
use DateTimeZone;
use Ramsey\Uuid\Uuid;
use RuntimeException;
use Throwable;

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
                $author = null;

                if ($record->author_profile_id !== '') {
                    try {
                        $authorResult = $authors->findOneById(
                            Uuid::fromString($record->author_profile_id),
                        );

                        if ($authorResult->hasProfile) {
                            $author = $authorResult->profile;
                        }
                    } catch (Throwable) {
                    }
                }

                return $this->transformRecord(
                    $record,
                    $blogPages->getOneById(
                        Uuid::fromString($record->blog_page_id),
                    ),
                    $author,
                );
            },
        ));
    }

    public function transformRecord(
        EntryRecord $record,
        Page $blogPage,
        Profile|null $author,
    ): Entry {
        if ($blogPage->id->toString() !== $record->blog_page_id) {
            throw new RuntimeException(
                'The blog page ID must match the entry record',
            );
        }

        if (
            $author !== null && $author->id->toString() !== $record->author_profile_id
        ) {
            throw new RuntimeException(
                'The author profile ID must match the entry record',
            );
        }

        $datePublished = null;

        if ($record->date_published !== null) {
            $datePublished = DateTimeImmutable::createFromFormat(
                'Y-m-d H:i:s',
                $record->date_published,
                new DateTimeZone('US/Central'),
            );
        }

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
            $record->use_short_hero,
            $record->use_custom_hero,
            $record->hero_darkening_overlay_opacity,
            $record->hero_image,
            new PageJson($record->hero_upper_cta),
            $record->hero_heading,
            $record->hero_subheading,
            $record->hero_paragraph,
        );
    }
}
