<?php

declare(strict_types=1);

namespace App\Profiles;

use App\Profiles\Persistence\FindAllProfiles;
use App\Profiles\Persistence\ProfileRecordToEntity;
use App\Profiles\Profile\ProfileCollection;

readonly class ProfileRepository
{
    public function __construct(
        private FindAllProfiles $findAllProfiles,
        private ProfileRecordToEntity $profileRecordToEntity,
    ) {
    }

    public function findAllProfiles(): ProfileCollection
    {
        return $this->profileRecordToEntity->transformCollection(
            $this->findAllProfiles->find(),
        );
    }
}
