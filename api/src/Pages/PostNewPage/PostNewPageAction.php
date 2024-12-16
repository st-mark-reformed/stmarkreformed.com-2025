<?php

declare(strict_types=1);

namespace App\Pages\PostNewPage;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PostNewPageAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->post('/pages/all-pages', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private CreatePage $createPage,
        private PageNameFactory $pageNameFactory,
        private PostNewPageResponder $responder,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $pageNameResult = $this->pageNameFactory->fromServerRequest(
            $request,
        );

        $result = $this->createPage->create($pageNameResult);

        return $this->responder->respond($result);
    }
}
