<?php

declare(strict_types=1);

namespace App\BlogEntries\PostNewEntry;

use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class EntryDataFactory
{
    public function fromServerRequest(
        string $blogPageId,
        ServerRequestInterface $request,
    ): EntryDataResult {
        $submittedData = $request->getParsedBody();
        $submittedData = is_array($submittedData) ? $submittedData : [];

        $entryName = $submittedData['entryName'] ?? '';

        return new EntryDataResult(
            $blogPageId,
            $entryName,
        );
    }
}
