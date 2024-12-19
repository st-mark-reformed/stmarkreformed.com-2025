<?php

declare(strict_types=1);

namespace App\Pages\GetPage;

use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageResult;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

readonly class Responder
{
    public function __construct(
        private ResponseFactoryInterface $responseFactory,
    ) {
    }

    public function respond(PageResult $result): ResponseInterface
    {
        $response = $this->responseFactory->createResponse()->withHeader(
            'Content-type',
            'application/json',
        );

        if (! $result->hasPage) {
            $response->getBody()->write((string) json_encode([]));

            return $response->withStatus(404);
        }

        $response->getBody()->write((string) json_encode(
            $result->page->asScalarArray(
                new PagePropertyCollection([
                    PageProperty::children,
                ]),
            ),
        ));

        return $response;
    }
}
