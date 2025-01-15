<?php

declare(strict_types=1);

namespace App\Pages\GetBlogPage;

use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageResult;
use App\Pages\Page\PageType;
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
            return $this->send404($response);
        }

        if ($result->page->type !== PageType::blog_entries) {
            return $this->send404($response);
        }

        $response->getBody()->write((string) json_encode(
            [
                'blogPage' => $result->page->asScalarArray(
                    new PagePropertyCollection([
                        PageProperty::children,
                    ]),
                ),
                'entries' => [],
            ],
        ));

        return $response;
    }

    private function send404(ResponseInterface $response): ResponseInterface
    {
        $response->getBody()->write((string) json_encode([]));

        return $response->withStatus(404);
    }
}
