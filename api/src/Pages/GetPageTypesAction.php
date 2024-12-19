<?php

declare(strict_types=1);

namespace App\Pages;

use App\Pages\Page\PageType;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;

use function array_map;
use function json_encode;

readonly class GetPageTypesAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/pages/types', self::class);
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $response->getBody()->write((string) json_encode(array_map(
            static function (PageType $pageType): array {
                return [
                    'type' => $pageType->name,
                    'name' => $pageType->humanReadable(),
                ];
            },
            PageType::cases(),
        )));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
