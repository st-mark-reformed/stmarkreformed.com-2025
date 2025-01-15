<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use Phinx\Db\Adapter\AdapterInterface;
use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

readonly class ProfilesTable
{
    public const string TABLE_NAME = 'profiles';

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
            'photo',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'title_or_honorific',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'first_name',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'last_name',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'email',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'leadership_position',
            AdapterInterface::PHINX_TYPE_STRING,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'bio',
            AdapterInterface::PHINX_TYPE_TEXT,
            ['null' => false, 'default' => ''],
        )->addColumn(
            'has_messages',
            AdapterInterface::PHINX_TYPE_BOOLEAN,
            ['null' => false, 'default' => false],
        )
            ->addIndex(['title_or_honorific'])
            ->addIndex(['first_name'])
            ->addIndex(['last_name'])
            ->addIndex(['email'])
            ->addIndex(['leadership_position'])
            ->addIndex(['has_messages']);
    }
}
