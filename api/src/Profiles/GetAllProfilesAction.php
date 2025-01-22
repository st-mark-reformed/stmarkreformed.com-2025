<?php

declare(strict_types=1);

namespace App\Profiles;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function json_encode;

readonly class GetAllProfilesAction
{
    public static function applyRoute(ApplyRoutesEvent $event): void
    {
        $event->get('/profiles/all-profiles', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(private ProfileRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $profiles = $this->repository->findAllProfiles();

        $response->getBody()->write((string) json_encode(
            $profiles->asScalarArray(),
        ));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
