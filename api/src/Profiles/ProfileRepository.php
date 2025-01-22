<?php

declare(strict_types=1);

namespace App\Profiles;

use App\Persistence\PersistNewRecord;
use App\Persistence\Result;
use App\Profiles\Persistence\CreateNewProfileRecord;
use App\Profiles\Persistence\FindAllProfiles;
use App\Profiles\Persistence\ProfileRecordToEntity;
use App\Profiles\Profile\FirstName;
use App\Profiles\Profile\LastName;
use App\Profiles\Profile\ProfileCollection;

readonly class ProfileRepository
{
    public function __construct(
        private FindAllProfiles $findAllProfiles,
        private PersistNewRecord $persistNewRecord,
        private ProfileRecordToEntity $profileRecordToEntity,
        private CreateNewProfileRecord $createNewProfileRecord,
    ) {
    }

    public function findAllProfiles(): ProfileCollection
    {
        return $this->profileRecordToEntity->transformCollection(
            $this->findAllProfiles->find(),
        );
    }

    public function createNewProfile(
        FirstName $firstName,
        LastName $lastName,
    ): Result {
        return $this->persistNewRecord->persist(
            $this->createNewProfileRecord->fromFirstLastName(
                $firstName,
                $lastName,
            ),
        );
    }
}
