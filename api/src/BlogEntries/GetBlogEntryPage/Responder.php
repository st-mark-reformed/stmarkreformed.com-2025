<?php

declare(strict_types=1);

namespace App\BlogEntries\GetBlogEntryPage;

use Psr\Http\Message\ResponseInterface;

interface Responder
{
    public function respond(ResponseInterface $response): ResponseInterface;
}
