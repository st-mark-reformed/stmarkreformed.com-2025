<?php

declare(strict_types=1);

namespace App\ContactForm;

use App\Persistence\ResultResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;

readonly class PostContactForm
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->post('/contact-form', self::class);
    }

    public function __construct(
        private SendEmail $sendEmail,
        private ResultResponder $responder,
        private ContactFormDataFactory $contactFormDataFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $data = $this->contactFormDataFactory->createFromRequest(
            $request,
        );

        return $this->responder->respond($this->sendEmail->send(
            $data,
        ));
    }
}
