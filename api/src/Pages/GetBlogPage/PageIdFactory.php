<?php

declare(strict_types=1);

namespace App\Pages\GetBlogPage;

use App\EmptyUuid;
use App\Persistence\UuidFactoryWithOrderedTimeCodec;
use Ramsey\Uuid\UuidInterface;
use Throwable;

readonly class PageIdFactory
{
    public function __construct(
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    public function fromString(string $uuid): UuidInterface
    {
        try {
            return $this->uuidFactory->fromString($uuid);
        } catch (Throwable) {
            return new EmptyUuid();
        }
    }
}
