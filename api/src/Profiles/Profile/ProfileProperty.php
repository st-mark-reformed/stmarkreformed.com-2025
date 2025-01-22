<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use function constant;

enum ProfileProperty
{
    case id;
    case photo;
    case titleOrHonorific;
    case firstName;
    case lastName;
    case email;
    case leadershipPosition;
    case bio;
    case hasMessages;

    public static function createFromString(string $property): ProfileProperty
    {
        /** @phpstan-ignore-next-line */
        return constant('ProfileProperty::' . $property);
    }
}
