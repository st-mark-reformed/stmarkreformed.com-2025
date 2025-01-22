<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use function array_map;
use function array_values;

readonly class ProfilePropertyCollection
{
    /** @var ProfileProperty[] */
    private array $properties;

    /** @param ProfileProperty[] $properties */
    public function __construct(array $properties = [])
    {
        $this->properties = array_values(array_map(
            static fn (ProfileProperty $p) => $p,
            $properties,
        ));
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_map($callback, $this->properties);
    }

    public function has(ProfileProperty $property): bool
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
            ProfileProperty::createFromString($property),
        );
    }
}
