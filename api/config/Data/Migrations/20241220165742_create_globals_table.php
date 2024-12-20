<?php

/** @noinspection PhpIllegalPsrClassPathInspection */

declare(strict_types=1);

use App\Globals\Persistence\GlobalsTable;
use Phinx\Migration\AbstractMigration;

// phpcs:disable Squiz.Classes.ClassFileName.NoMatch
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace

class CreateGlobalsTable extends AbstractMigration
{
    public function change(): void
    {
        GlobalsTable::createSchema($this)->create();
    }
}
