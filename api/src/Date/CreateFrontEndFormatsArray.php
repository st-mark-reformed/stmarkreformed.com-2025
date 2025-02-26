<?php

declare(strict_types=1);

namespace App\Date;

use DateTimeImmutable;

use function array_map;

// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class CreateFrontEndFormatsArray
{
    /** @phpstan-ignore-next-line */
    public static function create(DateTimeImmutable $date): array
    {
        return array_map(
            static fn (string $f) => $date->format(
                $f,
            ),
            [
                'd' => 'd',
                'D' => 'D',
                'j' => 'j',
                'l' => 'l',
                'S' => 'S',
                'F' => 'F',
                'm' => 'm',
                'M' => 'M',
                'n' => 'n',
                'Y' => 'Y',
                'a' => 'a',
                'A' => 'A',
                'g' => 'g',
                'G' => 'G',
                'h' => 'h',
                'H' => 'H',
                'i' => 'i',
                's' => 's',
            ],
        );
    }
}
