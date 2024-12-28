<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use App\Pages\Page\Page;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class PageEntityToRecord
{
    public function processPageEntity(Page $page): PageRecord
    {
        $record = new PageRecord();

        $record->id = $page->id->toString();

        $record->parent_id = $page->parentId->toString();

        $record->name = $page->name->value;

        $record->slug = $page->slug->value;

        $record->path = $page->path->value;

        $record->status = $page->status->name;

        $record->type = $page->type->name;

        $record->data = $page->data->value;

        $record->json = $page->json->toString();

        $record->position = $page->position;

        $record->show_in_menu = $page->showInMenu;

        $record->show_sub_page_sidebar = $page->showSubPageSidebar;

        $record->use_short_hero = $page->useShortHero;

        $record->use_custom_hero = $page->useCustomHero;

        $record->hero_darkening_overlay_opacity = $page->heroDarkeningOverlayOpacity;

        $record->hero_image = $page->heroImage;

        return $record;
    }
}
