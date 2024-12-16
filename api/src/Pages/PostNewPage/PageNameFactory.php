<?php

declare(strict_types=1);

namespace App\Pages\PostNewPage;

use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class PageNameFactory
{
    public function fromServerRequest(
        ServerRequestInterface $request,
    ): PageNameResult {
        $submittedData = $request->getParsedBody();
        $submittedData = is_array($submittedData) ? $submittedData : [];

        $pageName = $submittedData['pageName'] ?? '';

        return new PageNameResult($pageName);
    }
}
