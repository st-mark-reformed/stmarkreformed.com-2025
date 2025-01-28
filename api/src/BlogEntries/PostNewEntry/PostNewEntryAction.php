<?php

declare(strict_types=1);

namespace App\BlogEntries\PostNewEntry;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\Persistence\ResultResponder;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PostNewEntryAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->post('/blog-entries/{blogPageId}', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private CreateEntry $createEntry,
        private ResultResponder $responder,
        private EntryDataFactory $entryDataFactory,
    ) {
    }

    /** @param string[] $attributes */
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        UserAttributes $userAttributes,
        #[ArrayShape(['blogPageId' => 'string'])]
        array $attributes,
    ): ResponseInterface {
        $entryDataResult = $this->entryDataFactory->fromServerRequest(
            $attributes['blogPageId'],
            $request,
        );

        $result = $this->createEntry->create($entryDataResult);

        return $this->responder->respond($result);
    }
}
