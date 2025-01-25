<?php

declare(strict_types=1);

namespace App\Profiles;

use App\Profiles\Profile\Profile;

use function count;

readonly class ProfileResult
{
    public bool $hasProfile;

    public bool $hasErrors;

    public Profile $profile;

    /** @param string[] $errors */
    public function __construct(
        Profile|null $profile = null,
        public array $errors = [],
    ) {
        $this->hasProfile = $profile !== null;

        $this->hasErrors = count($errors) > 0;

        $this->profile = $profile ?? new Profile();
    }
}
