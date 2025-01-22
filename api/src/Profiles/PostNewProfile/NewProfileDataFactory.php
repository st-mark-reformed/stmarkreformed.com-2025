<?php

declare(strict_types=1);

namespace App\Profiles\PostNewProfile;

use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class NewProfileDataFactory
{
    public function fromServerRequest(
        ServerRequestInterface $request,
    ): NewProfileDataResult {
        $submittedData = $request->getParsedBody();
        $submittedData = is_array($submittedData) ? $submittedData : [];

        $firstName = $submittedData['firstName'] ?? '';
        $lastName  = $submittedData['lastName'] ?? '';

        return new NewProfileDataResult(
            $firstName,
            $lastName,
        );
    }
}
