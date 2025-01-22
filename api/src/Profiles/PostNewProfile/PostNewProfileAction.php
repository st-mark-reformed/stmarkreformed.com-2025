<?php

declare(strict_types=1);

namespace App\Profiles\PostNewProfile;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Persistence\ResultResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PostNewProfileAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->post('/profiles/all-profiles', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private ResultResponder $responder,
        private CreateProfile $createProfile,
        private NewProfileDataFactory $newProfileDataFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $newProfileDataResult = $this->newProfileDataFactory->fromServerRequest(
            $request,
        );

        $result = $this->createProfile->create($newProfileDataResult);

        return $this->responder->respond($result);
    }
}
