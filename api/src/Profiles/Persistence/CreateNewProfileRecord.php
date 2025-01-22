<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use App\Persistence\UuidFactoryWithOrderedTimeCodec;
use App\Profiles\Profile\FirstName;
use App\Profiles\Profile\LastName;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class CreateNewProfileRecord
{
    public function __construct(
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function fromFirstLastName(
        FirstName $firstName,
        LastName $lastName,
    ): ProfileRecord {
        $record = new ProfileRecord();

        $record->id = $this->uuidFactory->uuid1()->toString();

        $record->first_name = $firstName->value;

        $record->last_name = $lastName->value;

        return $record;
    }
}
