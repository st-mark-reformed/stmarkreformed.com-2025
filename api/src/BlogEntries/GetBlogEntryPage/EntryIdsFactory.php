<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use App\EmptyUuid;
use App\Persistence\UuidFactoryWithOrderedTimeCodec;
use JetBrains\PhpStorm\ArrayShape;
use Throwable;

readonly class EntryIdsFactory
{
    public function __construct(
        private UuidFactoryWithOrderedTimeCodec $uuidFactory,
    ) {
    }

    /** @param string[] $attributes */
    public function createFromAttributes(
        #[ArrayShape([
            'blogPageId' => 'string',
            'entryId' => 'string',
        ])]
        array $attributes,
    ): EntryIds {
        try {
            $blogPageId = $this->uuidFactory->fromString(
                $attributes['blogPageId'],
            );
        } catch (Throwable) {
            $blogPageId = new EmptyUuid();
        }

        try {
            $entryId = $this->uuidFactory->fromString(
                $attributes['entryId'],
            );
        } catch (Throwable) {
            $entryId = new EmptyUuid();
        }

        return new EntryIds($blogPageId, $entryId);
    }
}
