<?php

declare(strict_types=1);

namespace App\BlogEntries\Entry;

use function array_map;
use function array_values;

readonly class EntryPropertyCollection
{
    /** @var EntryProperty[] */
    private array $properties;

    /** @param EntryProperty[] $properties */
    public function __construct(array $properties = [])
    {
        $this->properties = array_values(array_map(
            static fn (EntryProperty $p) => $p,
            $properties,
        ));
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_map($callback, $this->properties);
    }

    public function has(EntryProperty $property): bool
    {
        foreach ($this->properties as $existingProperty) {
            if ($existingProperty->name !== $property->name) {
                continue;
            }

            return true;
        }

        return false;
    }

    public function hasByString(string $property): bool
    {
        return $this->has(
            EntryProperty::createFromString($property),
        );
    }
}
