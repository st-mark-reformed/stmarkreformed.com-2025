<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use App\EmptyUuid;
use App\Pages\Page\Page;
use App\Pages\Page\PageCollection;
use App\Pages\Page\PageData;
use App\Pages\Page\PageJson;
use App\Pages\Page\PageName;
use App\Pages\Page\PagePath;
use App\Pages\Page\PageSlug;
use App\Pages\Page\PageStatus;
use App\Pages\Page\PageType;
use Ramsey\Uuid\Uuid;

use function array_map;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class PageRecordToEntity
{
    public function transformCollectionFromRoot(
        PageRecordCollection $collection,
    ): PageCollection {
        return new PageCollection(array_map(
            fn (PageRecord $record) => $this->processPageRecord(
                $record,
                $collection,
            ),
            $collection->filter(
                static fn (PageRecord $r) => $r->parent_id === '',
            )->records,
        ));
    }

    private function processPageRecord(
        PageRecord $record,
        PageRecordCollection $recordCollection,
    ): Page {
        /** @var Page[] $children */
        $children = $recordCollection->filter(
            static fn (PageRecord $r) => $r->parent_id === $record->id,
        )->map(
            fn (PageRecord $r) => $this->processPageRecord(
                $r,
                $recordCollection,
            ),
        );

        return $this->transformRecord(
            $record,
            new PageCollection($children),
        );
    }

    public function transformRecord(
        PageRecord $record,
        PageCollection $children = new PageCollection(),
    ): Page {
        return new Page(
            Uuid::fromString($record->id),
            $record->parent_id === '' ?
                new EmptyUuid() :
                Uuid::fromString($record->parent_id),
            new PageName($record->name),
            new PageSlug($record->slug),
            new PagePath($record->path),
            PageStatus::fromString($record->status),
            PageType::fromString($record->type),
            new PageData($record->data),
            new PageJson($record->json),
            $record->position,
            $record->show_in_menu,
            $record->show_sub_page_sidebar,
            $record->use_short_hero,
            $record->use_custom_hero,
            $record->hero_darkening_overlay_opacity,
            $record->hero_image,
            new PageJson($record->hero_upper_cta),
            $record->hero_heading,
            $record->hero_subheading,
            $record->hero_paragraph,
            $children,
        );
    }
}
