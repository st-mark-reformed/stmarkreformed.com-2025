<?php

declare(strict_types=1);

namespace App\Profiles\Profile;

use Assert\Assert;

readonly class Email
{
    public function __construct(public string $value)
    {
        if ($this->value === '') {
            return;
        }

        Assert::that($this->value)->email();
    }
}
