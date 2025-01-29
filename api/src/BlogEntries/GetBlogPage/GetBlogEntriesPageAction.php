<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogPage;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\BlogEntries\EntryRepository;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function max;

readonly class GetBlogEntriesPageAction
{
    private const int LIMIT = 50;

    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get(
            '/blog-entries/{blogPageId}',
            self::class,
        )
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private Responder $responder,
        private PageIdFactory $pageIdFactory,
        private PageRepository $pageRepository,
        private EntryRepository $entryRepository,
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
        $pageNum = max(
            1,
            (int) ($request->getQueryParams()['page'] ?? '1'),
        );

        $blogPageId = $this->pageIdFactory->fromString(
            $attributes['blogPageId'],
        );

        $blogPageResult = $this->pageRepository->findAllPages()
            ->findAllByPageType(PageType::blog_entries)
            ->findOneById($blogPageId);

        $entries = $this->entryRepository->findEntries(
            blogPageId: $blogPageId,
            limit: self::LIMIT,
            offset: ($pageNum - 1) * self::LIMIT,
        );

        return $this->responder->respond(
            $blogPageResult,
            $entries,
            $pageNum,
        );
    }
}
