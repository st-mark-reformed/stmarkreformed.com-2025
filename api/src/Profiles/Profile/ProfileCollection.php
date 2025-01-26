<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use App\Profiles\ProfileResult;
use Ramsey\Uuid\UuidInterface;
use RuntimeException;

use function array_filter;
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

    public function first(): Profile
    {
        return $this->profiles[0];
    }

    public function findFirst(): ProfileResult
    {
        return new ProfileResult($this->profiles[0] ?? null);
    }

    public function filter(callable $callable): ProfileCollection
    {
        return new ProfileCollection(array_filter(
            $this->profiles,
            $callable,
        ));
    }

    public function findOneById(UuidInterface $id): ProfileResult
    {
        return $this->filter(
            static fn (Profile $p) => $p->id->equals($id),
        )->findFirst();
    }

    public function getOneById(UuidInterface $id): Profile
    {
        $result = $this->findOneById($id);

        if (! $result->hasProfile) {
            throw new RuntimeException('Profile not found');
        }

        return $result->profile;
    }
}
