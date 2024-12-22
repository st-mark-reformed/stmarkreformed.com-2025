<?php

declare(strict_types=1);

namespace App\Globals\Persistence;

use App\Persistence\Record;

class GlobalRecord extends Record
{
    public static function getTableName(): string
    {
        return GlobalsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return GlobalsTable::TABLE_NAME;
    }

    public string $id = '';

    public string $name = '';

    public string $slug = '';

    public string $json = '{}';
}
