<?php

declare(strict_types=1);

namespace App\BlogEntries;

use App\BlogEntries\Entry\EntryType;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;

use function array_map;
use function json_encode;

readonly class GetEntryTypesAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/blog-entries/types', self::class);
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $response->getBody()->write((string) json_encode(array_map(
            static fn (EntryType $entryType) => [
                'type' => $entryType->name,
                'name' => $entryType->humanReadable(),
            ],
            EntryType::cases(),
        )));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
