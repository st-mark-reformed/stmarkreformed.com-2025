<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\Persistence\Sort;

readonly class OrderBySort
{
    public function __construct(public OrderBy $orderBy, public Sort $sort)
    {
    }
}
