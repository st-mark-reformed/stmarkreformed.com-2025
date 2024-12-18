<?php

declare(strict_types=1);

namespace App\Pages\PatchPagesPosition;

use App\EmptyUuid;
use Ramsey\Uuid\UuidInterface;

readonly class Page
{
    public function __construct(
        public UuidInterface $id,
        public UuidInterface $parentId = new EmptyUuid(),
        public int $position = 0,
    ) {
    }
}
