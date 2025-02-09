<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\BlogEntries\Entry\Entry;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class EntryEntityToRecord
{
    public function processEntryEntity(Entry $entry): EntryRecord
    {
        $record = new EntryRecord();

        $record->id = $entry->id->toString();

        $record->blog_page_id = $entry->blogPage->id->toString();

        $record->author_profile_id = (string) $entry->author?->id->toString();

        $record->name = $entry->name->value;

        $record->slug = $entry->slug->value;

        $record->path = $entry->path->value;

        $record->status = $entry->status->name;

        $record->type = $entry->type->name;

        $record->data = $entry->data->value;

        $record->json = $entry->json->toString();

        $record->date_published = $entry->datePublished
            ?->format('Y-m-d H:i:s');

        $record->use_short_hero = $entry->useShortHero;

        $record->use_custom_hero = $entry->useCustomHero;

        $record->hero_darkening_overlay_opacity = $entry->heroDarkeningOverlayOpacity;

        $record->hero_image = $entry->heroImage;

        $record->hero_upper_cta = $entry->heroUpperCta->toString();

        $record->hero_heading = $entry->heroHeading;

        $record->hero_subheading = $entry->heroSubheading;

        $record->hero_paragraph = $entry->heroParagraph;

        return $record;
    }
}
