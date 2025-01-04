<?php

declare(strict_types=1);

namespace App;

use function count;
use function filter_var;
use function http_build_query;
use function ltrim;
use function rtrim;

use const FILTER_VALIDATE_URL;

readonly class UrlGenerator
{
    public function __construct(private string $baseUrl)
    {
    }

    public function generateIfNotFullyQualified(string $pathOrUrl): string
    {
        if (
            filter_var(
                $pathOrUrl,
                FILTER_VALIDATE_URL,
            ) !== false
        ) {
            return $pathOrUrl;
        }

        return $this->generate($pathOrUrl);
    }

    /** @param array<string, scalar> $query */
    public function generate(
        string $path,
        array $query = [],
    ): string {
        $cleanedPath = rtrim(
            ltrim(
                $path,
                '/',
            ),
            '/',
        );

        $url = $this->baseUrl;

        if ($cleanedPath !== '') {
            $url .= '/' . $cleanedPath;
        }

        if (count($query) > 0) {
            $url .= '?' . http_build_query($query);
        }

        return $url;
    }
}
