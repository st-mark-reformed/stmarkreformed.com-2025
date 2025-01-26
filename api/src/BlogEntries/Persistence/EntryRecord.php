<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\Persistence\Record;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class EntryRecord extends Record
{
    public static function getTableName(): string
    {
        return EntriesTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return EntriesTable::TABLE_NAME;
    }

    public string $id = '';

    public string $blog_page_id = '';

    public string $author_profile_id = '';

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
     * @see \App\BlogEntries\Entry\EntryType
     */
    public string $type = '';

    public string $data = '';

    public string $json = '{}';

    public string $date_published = '';
}
