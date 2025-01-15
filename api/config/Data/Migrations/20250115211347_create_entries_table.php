<?php

/** @noinspection PhpIllegalPsrClassPathInspection */

declare(strict_types=1);

use App\BlogEntries\Persistence\EntriesTable;
use Phinx\Migration\AbstractMigration;

// phpcs:disable Squiz.Classes.ClassFileName.NoMatch
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace

class CreateEntriesTable extends AbstractMigration
{
    public function change(): void
    {
        EntriesTable::createSchema($this)->create();
    }
}
