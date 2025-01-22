<?php

declare(strict_types=1);

namespace App\Profiles\PostNewProfile;

use App\Persistence\Result;
use App\Profiles\ProfileRepository;

readonly class CreateProfile
{
    public function __construct(private ProfileRepository $repository)
    {
    }

    public function create(NewProfileDataResult $result): Result
    {
        if (! $result->isValid) {
            return new Result(
                false,
                $result->errors,
            );
        }

        return $this->repository->createNewProfile(
            $result->firstName,
            $result->lastName,
        );
    }
}
