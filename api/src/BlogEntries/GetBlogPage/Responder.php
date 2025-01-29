<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogPage;

use App\BlogEntries\Entry\EntryCollection;
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

    public function respond(
        PageResult $result,
        EntryCollection $entries,
        int $pageNum,
    ): ResponseInterface {
        $response = $this->responseFactory->createResponse()->withHeader(
            'Content-type',
            'application/json',
        );

        if (! $result->hasPage || ($pageNum > 1 && $entries->count() < 1)) {
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
                'entries' => $entries->asScalarArray(),
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
