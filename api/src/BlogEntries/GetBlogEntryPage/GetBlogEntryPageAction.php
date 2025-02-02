<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\BlogEntries\EntryRepository;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class GetBlogEntryPageAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get(
            '/blog-entries/{blogPageId}/edit/{entryId}',
            self::class,
        )
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private EntryIdsFactory $entryIdsFactory,
        private EntryRepository $entryRepository,
        private ResponderFactory $responderFactory,
    ) {
    }

    /** @param string[] $attributes */
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        UserAttributes $userAttributes,
        #[ArrayShape([
            'blogPageId' => 'string',
            'entryId' => 'string',
        ])]
        array $attributes,
    ): ResponseInterface {
        $entryIds = $this->entryIdsFactory->createFromAttributes(
            $attributes,
        );

        $result = $this->entryRepository->findEntry($entryIds->entryId);

        return $this->responderFactory->createResponder(
            $entryIds,
            $result,
        )->respond($response);
    }
}
