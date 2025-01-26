<?php

declare(strict_types=1);

namespace App\BlogEntries\Entry;

use RuntimeException;
use Throwable;

use function constant;
use function implode;

enum EntryType
{
    case entry;
    case entry_builder;

    public static function fromString(string $type): EntryType
    {
        try {
            /** @phpstan-ignore-next-line */
            return constant('self::' . $type);
        } catch (Throwable) {
            throw new RuntimeException(implode('', [
                'Case "',
                $type,
                '" does not exist on "',
                EntryType::class,
                '" enum',
            ]));
        }
    }

    public function humanReadable(): string
    {
        return match ($this) {
            EntryType::entry => 'Entry',
            EntryType::entry_builder => 'Entry Builder',
        };
    }
}
