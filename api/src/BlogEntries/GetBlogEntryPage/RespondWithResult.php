<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use App\BlogEntries\Entry\Entry;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

readonly class RespondWithResult implements Responder
{
    public function __construct(private Entry $entry)
    {
    }

    public function respond(ResponseInterface $response): ResponseInterface
    {
        $response->getBody()->write((string) json_encode(
            $this->entry->asScalarArray(),
        ));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
