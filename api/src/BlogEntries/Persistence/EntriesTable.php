<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

readonly class EntriesTable
{
    public const string TABLE_NAME = 'entries';

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
            'blog_page_id',
            AdapterInterface::PHINX_TYPE_UUID,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'author_profile_id',
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
            'date_published',
            AdapterInterface::PHINX_TYPE_DATETIME,
            ['null' => false],
        )
            ->addIndex(['blog_page_id'])
            ->addIndex(['author_profile_id'])
            ->addIndex(['name'])
            ->addIndex(['slug'])
            ->addIndex(['path'])
            ->addIndex(['status'])
            ->addIndex(['date_published']);
    }
}
