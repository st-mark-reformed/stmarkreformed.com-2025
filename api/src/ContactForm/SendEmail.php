<?php

declare(strict_types=1);

namespace App\ContactForm;

use App\Globals\GlobalRepository;
use App\Persistence\Result;
use BuzzingPixel\Templating\TemplateEngineFactory;
use Config\SystemFromAddress;
use Soundasleep\Html2Text;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Throwable;

use function array_map;

readonly class SendEmail
{
    public function __construct(
        private MailerInterface $mailer,
        private GlobalRepository $globalRepository,
        private SystemFromAddress $systemFromAddress,
        private TemplateEngineFactory $templateEngineFactory,
    ) {
    }

    public function send(ContactFormData $data): Result
    {
        if ($data->hasErrors()) {
            return new Result(
                success: false,
                messages: $data->errors,
            );
        }

        $contactGlobal = $this->globalRepository->findAllGlobals()->getBySlug(
            'contactForm',
        );

        /** @var string[] $recipients */
        $recipients = array_map(
            /** @phpstan-ignore-next-line */
            static fn (array $v) => $v['value'],
            (array) $contactGlobal->json->data['recipients'],
        );

        $message = new Email();

        $message->from($this->systemFromAddress->address);

        $message->to(...$recipients);

        $message->subject('St. Mark Website Contact Form');

        $message->replyTo(new Address(
            address: $data->emailAddress,
            name: $data->name,
        ));

        $html = $this->templateEngineFactory->create()
            ->templatePath(__DIR__ . '/Email.phtml')
            ->addVar('data', $data)
            ->render();

        $message->html($html);

        $message->text(Html2Text::convert($html));

        try {
            $this->mailer->send($message);

            return new Result(
                success: true,
                messages: [],
            );
        } catch (Throwable) {
            return new Result(
                success: true,
                messages: ['An unknown error occurred.'],
            );
        }
    }
}
