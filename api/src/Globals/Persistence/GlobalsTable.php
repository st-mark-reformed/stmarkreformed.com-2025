<?php

declare(strict_types=1);

namespace App\Globals\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

readonly class GlobalsTable
{
    public const string TABLE_NAME = 'globals';

    public static function createSchema(MigrationInterface $migration): Table
    {
        return $migration->table(
            self::TABLE_NAME,
            [
                'id' => false,
                'primary_key' => ['id'],
            ],
        )->addColumn(
            'id',
            AdapterInterface::PHINX_TYPE_UUID,
        )->addColumn(
            'name',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'slug',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'json',
            AdapterInterface::PHINX_TYPE_JSON,
            ['null' => false, 'default' => '{}'],
        );
    }
}
