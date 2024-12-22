<?php

declare(strict_types=1);

namespace App\Globals;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function json_encode;

readonly class GetAllGlobalsAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/globals/all', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(private GlobalRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $globals = $this->repository->findAllGlobals();

        $response->getBody()->write((string) json_encode(
            $globals->asScalarArray(),
        ));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
