<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

use App\Persistence\Record;

class PageRecord extends Record
{
    public static function getTableName(): string
    {
        return PagesTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return PagesTable::TABLE_NAME;
    }

    public string $id = '';

    public string $parent_id = '';

    public string $name = '';

    public string $slug = '';

    public string $path = '';

    /**
     * Must be the values found in
     *
     * @see \App\Pages\Page\PageStatus
     */
    public string $status = '';

    /**
     * Must be the values found in
     *
     * @see \App\Pages\Page\PageType
     */
    public string $type = '';

    public string $data = '';

    public string $json = '{}';

    public int $position = 0;

    public bool $show_in_menu = true;

    public bool $show_sub_page_sidebar = true;

    public bool $use_short_hero = true;

    public bool $use_custom_hero = false;

    public int $hero_darkening_overlay_opacity = 0;

    public string $hero_image = '';
}
