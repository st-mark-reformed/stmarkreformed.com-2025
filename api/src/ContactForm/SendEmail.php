<?php

declare(strict_types=1);

namespace App\ContactForm;

use App\Persistence\Result;

readonly class SendEmail
{
    public function send(ContactFormData $data): Result
    {
        if ($data->hasErrors()) {
            return new Result(
                success: false,
                messages: $data->errors,
            );
        }

        // TODO: Send email

        return new Result(
            success: true,
            messages: [],
        );
    }
}
