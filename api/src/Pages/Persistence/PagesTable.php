<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

readonly class PagesTable
{
    public const string TABLE_NAME = 'pages';

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
            'parent_id',
            AdapterInterface::PHINX_TYPE_UUID,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'name',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'slug',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'path',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'status',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'type',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'data',
            AdapterInterface::PHINX_TYPE_TEXT,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'json',
            AdapterInterface::PHINX_TYPE_JSON,
            ['null' => false, 'default' => '{}'],
        )->addColumn(
            'position',
            AdapterInterface::PHINX_TYPE_SMALL_INTEGER,
            ['null' => false],
        )->addColumn(
            'show_in_menu',
            AdapterInterface::PHINX_TYPE_BOOLEAN,
            ['null' => false, 'default' => true],
        )
            ->addIndex(['parent_id'])
            ->addIndex(['name'])
            ->addIndex(['slug'])
            ->addIndex(['path'])
            ->addIndex(['status'])
            ->addIndex(['show_in_menu']);
    }
}
