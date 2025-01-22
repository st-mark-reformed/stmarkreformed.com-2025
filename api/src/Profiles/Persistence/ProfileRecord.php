<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

use App\Persistence\Record;

class ProfileRecord extends Record
{
    public static function getTableName(): string
    {
        return ProfilesTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return ProfilesTable::TABLE_NAME;
    }

    public string $id = '';

    public string $photo = '';

    public string $title_or_honorific = '';

    public string $first_name = '';

    public string $last_name = '';

    public string $email = '';

    public string $leadership_position = '';

    public string $bio = '';

    public bool $has_messages = true;
}
