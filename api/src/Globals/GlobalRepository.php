<?php

declare(strict_types=1);

namespace App\Globals;

use App\Generator\EnqueueGenerateSiteData;
use App\Globals\Global\GlobalCollection;
use App\Globals\Global\GlobalItem;
use App\Globals\Persistence\FindAllGlobals;
use App\Globals\Persistence\GlobalEntityToRecord;
use App\Globals\Persistence\GlobalRecordToEntity;
use App\Persistence\PersistNewRecord;
use App\Persistence\PersistRecord;
use App\Persistence\Result;
use App\Persistence\UuidFactoryWithOrderedTimeCodec;

readonly class GlobalRepository
{
    public function __construct(
        private PersistRecord $persistRecord,
        private FindAllGlobals $findAllGlobals,
        private PersistNewRecord $persistNewRecord,
        private GlobalRecordToEntity $recordToEntity,
        private GlobalEntityToRecord $entityToRecord,
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
        private EnqueueGenerateSiteData $enqueueGenerateSiteData,
    ) {
    }

    public function findAllGlobals(): GlobalCollection
    {
        return $this->recordToEntity->transformCollection(
            $this->findAllGlobals->find(),
        );
    }

    public function persistNew(GlobalItem $global): Result
    {
        $global = $global->withId($this->uuidFactory->uuid1());

        $result = $this->persistNewRecord->persist(
            $this->entityToRecord->processEntity($global),
        );

        $this->enqueueGenerateSiteData->enqueue();

        return $result;
    }

    public function persist(GlobalItem $global): Result
    {
        $result = $this->persistRecord->persist(
            $this->entityToRecord->processEntity($global),
        );

        $this->enqueueGenerateSiteData->enqueue();

        return $result;
    }
}
