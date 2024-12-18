<?php

declare(strict_types=1);

namespace App\Pages\OverlappingUrisReport;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Pages\PageRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function json_encode;

readonly class GetOverlappingUriReportAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get(
            '/pages/overlapping-uris-report',
            self::class,
        )->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(private PageRepository $pageRepository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $report = $this->pageRepository->createOverlappingUriReport();

        $response->getBody()->write((string) json_encode(
            $report->asArray(),
        ));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
