<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use App\Profiles\Profile\Bio;
use App\Profiles\Profile\Email;
use App\Profiles\Profile\FirstName;
use App\Profiles\Profile\LastName;
use App\Profiles\Profile\LeadershipPosition;
use App\Profiles\Profile\Photo;
use App\Profiles\Profile\Profile;
use App\Profiles\Profile\ProfileCollection;
use App\Profiles\Profile\TitleOrHonorific;
use Ramsey\Uuid\Uuid;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class ProfileRecordToEntity
{
    public function transformCollection(
        ProfileRecordCollection $collection,
    ): ProfileCollection {
        /** @phpstan-ignore-next-line */
        return new ProfileCollection($collection->map(
            function (ProfileRecord $record): Profile {
                return $this->transformRecord($record);
            },
        ));
    }

    public function transformRecord(ProfileRecord $record): Profile
    {
        return new Profile(
            Uuid::fromString($record->id),
            new Photo($record->photo),
            new TitleOrHonorific(
                $record->title_or_honorific,
            ),
            new FirstName($record->first_name),
            new LastName($record->last_name),
            new Email($record->email),
            LeadershipPosition::fromString(
                $record->leadership_position,
            ),
            new Bio($record->bio),
            $record->has_messages,
        );
    }
}
