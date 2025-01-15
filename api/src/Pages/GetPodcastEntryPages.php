<?php

declare(strict_types=1);

namespace App\Pages;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Pages\Page\PageType;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class GetPodcastEntryPages
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/pages/podcast-entry-pages', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(private GetEntryTypePagesResponder $responder)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        return $this->responder->respond(
            PageType::podcast_entries,
            $response,
        );
    }
}
