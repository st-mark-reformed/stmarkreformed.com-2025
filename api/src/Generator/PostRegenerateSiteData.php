<?php

declare(strict_types=1);

namespace App\Generator;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Persistence\Result;
use App\Persistence\ResultResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;
use Throwable;

readonly class PostRegenerateSiteData
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->post('/site-data/regenerate', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private ResultResponder $responder,
        private GenerateSiteData $generateSiteData,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        try {
            $this->generateSiteData->generate();

            $result = new Result(true, []);
        } catch (Throwable $e) {
            $result = new Result(
                false,
                [
                    'File: ' . $e->getFile(),
                    'Line: ' . $e->getLine(),
                    'Message: ' . $e->getMessage(),
                ],
            );
        }

        return $this->responder->respond($result);
    }
}
