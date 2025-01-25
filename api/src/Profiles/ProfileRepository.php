<?php

declare(strict_types=1);

namespace App\Profiles;

use App\Generator\EnqueueGenerateSiteData;
use App\Persistence\FindRecordById;
use App\Persistence\PersistNewRecord;
use App\Persistence\PersistRecord;
use App\Persistence\Result;
use App\Persistence\UuidCollection;
use App\Profiles\Persistence\CreateNewProfileRecord;
use App\Profiles\Persistence\DeleteProfiles;
use App\Profiles\Persistence\FindAllProfiles;
use App\Profiles\Persistence\ProfileEntityToRecord;
use App\Profiles\Persistence\ProfileRecord;
use App\Profiles\Persistence\ProfileRecordToEntity;
use App\Profiles\Profile\FirstName;
use App\Profiles\Profile\LastName;
use App\Profiles\Profile\Profile;
use App\Profiles\Profile\ProfileCollection;
use Ramsey\Uuid\Exception\InvalidUuidStringException;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

readonly class ProfileRepository
{
    public function __construct(
        private PersistRecord $persistRecord,
        private DeleteProfiles $deleteProfiles,
        private FindRecordById $findRecordById,
        private FindAllProfiles $findAllProfiles,
        private PersistNewRecord $persistNewRecord,
        private ProfileRecordToEntity $profileRecordToEntity,
        private ProfileEntityToRecord $profileEntityToRecord,
        private CreateNewProfileRecord $createNewProfileRecord,
        private EnqueueGenerateSiteData $enqueueGenerateSiteData,
    ) {
    }

    public function findAllProfiles(): ProfileCollection
    {
        return $this->profileRecordToEntity->transformCollection(
            $this->findAllProfiles->find(),
        );
    }

    public function findProfileById(string|UuidInterface $id): ProfileResult
    {
        try {
            $id = $id instanceof UuidInterface ? $id : Uuid::fromString(
                $id,
            );
        } catch (InvalidUuidStringException) {
            return new ProfileResult(
                null,
                ['Invalid ID provided'],
            );
        }

        $recordResult = $this->findRecordById->find(
            $id,
            ProfileRecord::class,
        );

        if (
            ! $recordResult->hasRecord ||
            ! ($recordResult->record instanceof ProfileRecord)
        ) {
            return new ProfileResult();
        }

        return new ProfileResult(
            $this->profileRecordToEntity->transformRecord(
                $recordResult->record,
            ),
        );
    }

    public function createNewProfile(
        FirstName $firstName,
        LastName $lastName,
    ): Result {
        $result = $this->persistNewRecord->persist(
            $this->createNewProfileRecord->fromFirstLastName(
                $firstName,
                $lastName,
            ),
        );

        $this->enqueueGenerateSiteData->enqueue();

        return $result;
    }

    public function persistProfile(Profile $profile): Result
    {
        $result = $this->persistRecord->persist(
            $this->profileEntityToRecord->transform($profile),
        );

        $this->enqueueGenerateSiteData->enqueue();

        return $result;
    }

    public function deleteProfiles(UuidCollection $ids): Result
    {
        $result = $this->deleteProfiles->delete($ids);

        $this->enqueueGenerateSiteData->enqueue();

        return $result;
    }
}
