<?php

declare(strict_types=1);

namespace App\Pages;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Persistence\ResultResponder;
use App\Persistence\UuidCollectionFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class DeletePagesAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->delete('/pages/all-pages', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private ResultResponder $responder,
        private PageRepository $repository,
        private UuidCollectionFactory $requestDataFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $ids = $this->requestDataFactory->fromServerRequest(
            $request,
        );

        $result = $this->repository->deletePages($ids);

        return $this->responder->respond($result);
    }
}
