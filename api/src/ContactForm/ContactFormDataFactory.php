<?php

declare(strict_types=1);

namespace App\ContactForm;

use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class ContactFormDataFactory
{
    public function createFromRequest(
        ServerRequestInterface $request,
    ): ContactFormData {
        $body = $request->getParsedBody();

        $body = is_array($body) ? $body : [];

        return new ContactFormData(
            aPassword: $body['aPassword'] ?? '',
            yourCompany: $body['yourCompany'] ?? '',
            fromUrl: $body['fromUrl'] ?? '',
            name: $body['name'] ?? '',
            emailAddress: $body['emailAddress'] ?? '',
            message: $body['message'] ?? '',
        );
    }
}
