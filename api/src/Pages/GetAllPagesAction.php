<?php

declare(strict_types=1);

namespace App\Pages;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function json_encode;

readonly class GetAllPagesAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/pages/all-pages', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(private PageRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $pages = $this->repository->findAllPages();

        $response->getBody()->write((string) json_encode(
            $pages->asScalarArray(
                new PagePropertyCollection([
                    PageProperty::data,
                    PageProperty::json,
                ]),
            ),
        ));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
