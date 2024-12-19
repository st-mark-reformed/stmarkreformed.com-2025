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

        return $record;
    }
}
