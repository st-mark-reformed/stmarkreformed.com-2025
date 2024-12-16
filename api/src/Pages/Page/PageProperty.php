<?php

declare(strict_types=1);

namespace App\Pages\Page;

use function constant;

enum PageProperty
{
    case id;
    case parentId;
    case name;
    case slug;
    case path;
    case status;
    case type;
    case data;
    case json;
    case position;
    case showInMenu;
    case children;

    public static function createFromString(string $property): PageProperty
    {
        /** @phpstan-ignore-next-line */
        return constant('PageProperty::' . $property);
    }
}
