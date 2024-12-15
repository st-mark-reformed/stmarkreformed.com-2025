<?php

declare(strict_types=1);

namespace App\Pages\PostNewPage;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function json_encode;

readonly class PostNewPageAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->post('/pages/all-pages', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        // TODO: Implement __invoke() method.

        $response->getBody()->write((string) json_encode([
            'success' => true,
            'messages' => [],
        ]));

        return $response;
    }
}
