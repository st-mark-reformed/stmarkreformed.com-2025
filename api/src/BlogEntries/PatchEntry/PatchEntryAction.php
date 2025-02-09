<?php

declare(strict_types=1);

namespace App\BlogEntries\PatchEntry;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\BlogEntries\EntryRepository;
use App\BlogEntries\GetBlogEntryPage\EntryIdsFactory;
use App\Persistence\ResultResponder;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PatchEntryAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->patch(
            '/blog-entries/{blogPageId}/edit/{entryId}',
            self::class,
        )
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private UpdateEntry $updateEntry,
        private ResultResponder $responder,
        private EntryIdsFactory $entryIdsFactory,
        private EntryRepository $entryRepository,
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

        $entryResult = $this->entryRepository->findEntry(
            $entryIds->entryId,
        );

        $result = $this->updateEntry->fromRequest(
            $request,
            $entryIds,
            $entryResult,
        );

        return $this->responder->respond($result);
    }
}
