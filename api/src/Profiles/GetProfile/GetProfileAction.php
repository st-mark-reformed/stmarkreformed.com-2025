<?php

declare(strict_types=1);

namespace App\Profiles\GetProfile;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\Profiles\ProfileRepository;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class GetProfileAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/profiles/{profileId}', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private Responder $responder,
        private ProfileRepository $repository,
        private ProfileIdFactory $profileIdFactory,
    ) {
    }

    /** @param string[] $attributes */
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        UserAttributes $userAttributes,
        #[ArrayShape(['profileId' => 'string'])]
        array $attributes,
    ): ResponseInterface {
        $profileId = $this->profileIdFactory->fromString(
            $attributes['profileId'],
        );

        $result = $this->repository->findProfileById($profileId);

        return $this->responder->respond($result);
    }
}
