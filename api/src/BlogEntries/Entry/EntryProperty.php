<?php

declare(strict_types=1);

namespace App\BlogEntries\Entry;

use function constant;

enum EntryProperty
{
    case id;
    case blogPage;
    case author;
    case name;
    case slug;
    case path;
    case status;
    case type;
    case data;
    case json;
    case datePublished;

    public static function createFromString(string $property): EntryProperty
    {
        /** @phpstan-ignore-next-line */
        return constant('EntryProperty::' . $property);
    }
}
