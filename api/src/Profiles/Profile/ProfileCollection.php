<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use function array_map;
use function array_values;
use function count;

readonly class ProfileCollection
{
    /** @var Profile[] */
    private array $profiles;

    /** @param Profile[] $entries */
    public function __construct(array $entries = [])
    {
        $this->profiles = array_values(array_map(
            static fn (Profile $e) => $e,
            $entries,
        ));
    }

    public function hasProfiles(): bool
    {
        return $this->count() > 0;
    }

    public function count(): int
    {
        return count($this->profiles);
    }

    /** @return mixed[] */
    public function asScalarArray(
        ProfilePropertyCollection $omit = new ProfilePropertyCollection(),
    ): array {
        return array_map(
            static fn (Profile $p) => $p->asScalarArray($omit),
            $this->profiles,
        );
    }
}
