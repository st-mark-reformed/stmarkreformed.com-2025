<?php

declare(strict_types=1);

namespace App\Globals;

use App\Globals\Global\GlobalCollection;
use App\Globals\Persistence\FindAllGlobals;
use App\Globals\Persistence\GlobalRecordToEntity;

readonly class GlobalRepository
{
    public function __construct(
        private FindAllGlobals $findAllGlobals,
        private GlobalRecordToEntity $recordToEntity,
    ) {
    }

    public function findAllGlobals(): GlobalCollection
    {
        return $this->recordToEntity->transformCollection(
            $this->findAllGlobals->find(),
        );
    }
}
