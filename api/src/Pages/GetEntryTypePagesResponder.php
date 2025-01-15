<?php

declare(strict_types=1);

namespace App\Pages;

use App\Pages\Page\Page;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageType;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

readonly class GetEntryTypePagesResponder
{
    public function __construct(private PageRepository $repository)
    {
    }

    public function respond(
        PageType $pageType,
        ResponseInterface $response,
    ): ResponseInterface {
        $pages = [];

        $this->repository->findAllPages()->walkAll(
            static function (Page $page) use (
                &$pages,
                $pageType,
            ): void {
                if ($page->type !== $pageType) {
                    return;
                }

                $pages[] = $page->asScalarArray(
                    new PagePropertyCollection([
                        PageProperty::data,
                        PageProperty::json,
                    ]),
                );
            },
        );

        $response->getBody()->write((string) json_encode($pages));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
