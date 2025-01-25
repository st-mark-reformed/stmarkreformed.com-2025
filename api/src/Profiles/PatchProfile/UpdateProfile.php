<?php

declare(strict_types=1);

namespace App\Profiles\PatchProfile;

use App\Persistence\Result;
use App\Profiles\ProfileRepository;
use App\Profiles\ProfileResult;
use Psr\Http\Message\ServerRequestInterface;
use Throwable;

use function assert;
use function count;
use function is_array;

readonly class UpdateProfile
{
    public function __construct(
        private ProfileRepository $repository,
        private ParseImageUploads $parseImageUploads,
    ) {
    }

    public function fromRequest(
        ServerRequestInterface $request,
        ProfileResult $profileResult,
    ): Result {
        if (! $profileResult->hasProfile) {
            return new Result(
                false,
                ['Profile not found'],
            );
        }

        $errors = [];

        $profile = $profileResult->profile;

        $body = $request->getParsedBody();
        assert(is_array($body));

        try {
            $profile = $profile->withPhoto($body['photo']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withTitleOrHonorific(
                $body['titleOrHonorific'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withFirstName($body['firstName']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withLastName($body['lastName']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withEmail($body['email']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withLeadershipPosition(
                $body['leadershipPosition']['value'],
            );
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withBio($body['bio']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        try {
            $profile = $profile->withHasMessages($body['hasMessages']);
        } catch (Throwable $e) {
            $errors[] = $e->getMessage();
        }

        if (count($errors) > 0) {
            return new Result(
                false,
                $errors,
            );
        }

        $profile = $this->parseImageUploads->fromProfile($profile);

        return $this->repository->persistProfile($profile);
    }
}
