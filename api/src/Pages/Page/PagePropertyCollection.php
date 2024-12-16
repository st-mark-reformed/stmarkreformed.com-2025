<?php

declare(strict_types=1);

namespace App\Pages\Page;

use function array_map;
use function array_values;

readonly class PagePropertyCollection
{
    /** @var PageProperty[] */
    private array $properties;

    /** @param PageProperty[] $properties */
    public function __construct(array $properties = [])
    {
        $this->properties = array_values(array_map(
            static fn (PageProperty $p) => $p,
            $properties,
        ));
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_map($callback, $this->properties);
    }

    public function has(PageProperty $property): bool
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
            PageProperty::createFromString($property),
        );
    }
}
