<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

enum OrderBy
{
    case name;
    case slug;
    case path;
    case status;
    case type;
    case date_published;
}
