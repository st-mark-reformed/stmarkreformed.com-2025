<?php

declare(strict_types=1);

namespace App\Authentication;

use RuntimeException;

enum Role
{
    case CMS;

    case MEMBER;

    public static function createFromHumanReadable(string $role): Role
    {
        return match ($role) {
            Role::CMS->humanReadable() => Role::CMS,
            Role::MEMBER->humanReadable() => Role::MEMBER,
            default => throw new RuntimeException(
                $role . ' is not a valid UserRole',
            ),
        };
    }

    public function humanReadable(): string
    {
        return match ($this) {
            Role::CMS => 'CMS',
            Role::MEMBER => 'Member',
        };
    }
}
