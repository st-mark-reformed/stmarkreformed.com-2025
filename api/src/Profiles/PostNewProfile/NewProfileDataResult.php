<?php

declare(strict_types=1);

namespace App\Profiles\PostNewProfile;

use App\Profiles\Profile\FirstName;
use App\Profiles\Profile\LastName;

use function count;

readonly class NewProfileDataResult
{
    public bool $isValid;

    /** @var string[] */
    public array $errors;

    public FirstName $firstName;

    public LastName $lastName;

    public function __construct(
        string $firstName,
        string $lastName,
    ) {
        $errors = [];

        if ($firstName === '') {
            $errors[] = 'First Name cannot be empty';
        }

        if ($lastName === '') {
            $errors[] = 'Last Name cannot be empty';
        }

        $this->isValid = count($errors) < 1;

        $this->errors = $errors;

        $this->firstName = new FirstName($firstName);

        $this->lastName = new LastName($lastName);
    }
}
