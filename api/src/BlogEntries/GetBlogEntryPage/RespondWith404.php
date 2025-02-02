<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use Psr\Http\Message\ResponseInterface;

use function json_encode;

readonly class RespondWith404 implements Responder
{
    public function respond(ResponseInterface $response): ResponseInterface
    {
        $response->getBody()->write((string) json_encode([]));

        return $response->withStatus(404);
    }
}
