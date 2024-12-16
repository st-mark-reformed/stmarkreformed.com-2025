<?php

/** @noinspection PhpIllegalPsrClassPathInspection */

declare(strict_types=1);

use App\Pages\Persistence\PagesTable;
use Phinx\Migration\AbstractMigration;

// phpcs:disable Squiz.Classes.ClassFileName.NoMatch
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace

class CreatePagesTable extends AbstractMigration
{
    public function change(): void
    {
        PagesTable::createSchema($this)->create();
    }
}
