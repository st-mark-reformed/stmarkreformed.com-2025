<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class PageRecord
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
     * @see \App\Pages\PageStatus
     */
    public string $status = '';

    /**
     * Must be the values found in
     *
     * @see \App\Pages\PageType
     */
    public string $type = '';

    public string $data = '';

    public string $json = '{}';

    public int $position = 0;

    public bool $show_in_menu = true;
}
