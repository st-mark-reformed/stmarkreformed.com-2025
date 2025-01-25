<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use App\Profiles\Profile\Profile;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class ProfileEntityToRecord
{
    public function transform(Profile $profile): ProfileRecord
    {
        $record = new ProfileRecord();

        $record->id = $profile->id->toString();

        $record->photo = $profile->photo->value;

        $record->title_or_honorific = $profile->titleOrHonorific->value;

        $record->first_name = $profile->firstName->value;

        $record->last_name = $profile->lastName->value;

        $record->email = $profile->email->value;

        $record->leadership_position = $profile->leadershipPosition->name;

        $record->bio = $profile->bio->value;

        $record->has_messages = $profile->hasMessages;

        return $record;
    }
}
