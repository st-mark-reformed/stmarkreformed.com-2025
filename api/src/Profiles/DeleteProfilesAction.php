<?php

declare(strict_types=1);

namespace App\Profiles;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Persistence\ResultResponder;
use App\Persistence\UuidCollectionFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class DeleteProfilesAction
{
    public function __construct(
        private ResultResponder $responder,
        private ProfileRepository $repository,
        private UuidCollectionFactory $requestDataFactory,
    ) {
    }

    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->delete('/profiles/all-profiles', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $ids = $this->requestDataFactory->fromServerRequest(
            $request,
        );

        $result = $this->repository->deleteProfiles($ids);

        return $this->responder->respond($result);
    }
}
