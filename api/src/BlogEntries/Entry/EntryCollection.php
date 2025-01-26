<?php

declare(strict_types=1);

namespace App\BlogEntries\Entry;

use function array_map;
use function array_values;
use function count;

readonly class EntryCollection
{
    /** @var Entry[] */
    private array $entries;

    /** @param Entry[] $entries */
    public function __construct(array $entries = [])
    {
        $this->entries = array_values(array_map(
            static fn (Entry $e) => $e,
            $entries,
        ));
    }

    public function hasProfiles(): bool
    {
        return $this->count() > 0;
    }

    public function count(): int
    {
        return count($this->entries);
    }

    /** @return mixed[] */
    public function asScalarArray(
        EntryPropertyCollection $omit = new EntryPropertyCollection(),
    ): array {
        return array_map(
            static fn (Entry $e) => $e->asScalarArray($omit),
            $this->entries,
        );
    }
}
