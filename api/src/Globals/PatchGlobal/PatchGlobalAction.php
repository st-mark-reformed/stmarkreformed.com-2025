<?php

declare(strict_types=1);

namespace App\Globals\PatchGlobal;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Persistence\ResultResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PatchGlobalAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->patch('/globals/all', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private ResultResponder $responder,
        private GlobalFactory $globalFactory,
        private PersistGlobal $persistGlobal,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $global = $this->globalFactory->createFromServerRequest(
            $request,
        );

        $result = $this->persistGlobal->persist($global);

        return $this->responder->respond($result);
    }
}
