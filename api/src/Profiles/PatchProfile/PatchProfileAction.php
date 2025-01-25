<?php

declare(strict_types=1);

namespace App\Profiles\PatchProfile;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\Persistence\ResultResponder;
use App\Profiles\GetProfile\ProfileIdFactory;
use App\Profiles\ProfileRepository;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PatchProfileAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->patch('/profiles/{profileId}', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private ResultResponder $responder,
        private UpdateProfile $updateProfile,
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

        $profileResult = $this->repository->findProfileById($profileId);

        $result = $this->updateProfile->fromRequest(
            $request,
            $profileResult,
        );

        return $this->responder->respond($result);
    }
}
