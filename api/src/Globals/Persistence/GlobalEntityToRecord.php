<?php

declare(strict_types=1);

namespace App\Globals\Persistence;

use App\Globals\Global\GlobalItem;

readonly class GlobalEntityToRecord
{
    public function processEntity(GlobalItem $global): GlobalRecord
    {
        $record = new GlobalRecord();

        $record->id = $global->id->toString();

        $record->name = $global->name->value;

        $record->slug = $global->slug->value;

        $record->json = $global->json->toString();

        return $record;
    }
}
