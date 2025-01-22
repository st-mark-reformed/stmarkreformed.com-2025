<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use RuntimeException;
use Throwable;

use function constant;
use function implode;

enum LeadershipPosition
{
    case none;
    case pastor;
    case associate_pastor;
    case assistant_pastor;
    case elder;
    case ruling_elder;
    case deacon;

    public function asScalarValue(): string
    {
        return match ($this) {
            self::none => '',
            default => $this->name,
        };
    }

    public static function fromString(string $type): LeadershipPosition
    {
        if ($type === '') {
            $type = 'none';
        }

        try {
            /** @phpstan-ignore-next-line */
            return constant('self::' . $type);
        } catch (Throwable) {
            throw new RuntimeException(implode('', [
                'Case "',
                $type,
                '" does not exist on "',
                LeadershipPosition::class,
                '" enum',
            ]));
        }
    }

    public function humanReadable(): string
    {
        return match ($this) {
            self::none => 'None',
            self::pastor => 'Pastor',
            self::associate_pastor => 'Associate Pastor',
            self::assistant_pastor => 'Assistant Pastor',
            self::elder => 'Elder',
            self::ruling_elder => 'Ruling Elder',
            self::deacon => 'Deacon',
        };
    }
}
