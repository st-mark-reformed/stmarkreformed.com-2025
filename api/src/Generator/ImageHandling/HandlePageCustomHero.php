<?php

declare(strict_types=1);

namespace App\Generator\ImageHandling;

use App\ImageHandling\Resizing\ImageResizeHandler;
use App\UrlGenerator;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class HandlePageCustomHero
{
    public function __construct(
        private UrlGenerator $urlGenerator,
        private ImageResizeHandler $imageResizeHandler,
    ) {
    }

    /** @phpstan-ignore-next-line */
    public function handle(array $pageData): array
    {
        $pageData['heroImage']   ??= '';
        $pageData['heroImage1x'] ??= '';
        $pageData['heroImage2x'] ??= '';

        if ($pageData['heroImage'] === '') {
            return $pageData;
        }

        $pageData['heroImage1x'] = $this->imageResizeHandler->resizeToWidth(
            pathOrUrl: $pageData['heroImage'],
            pixelWidth: 1920,
        );

        $pageData['heroImage2x'] = $this->imageResizeHandler->resizeToWidth(
            pathOrUrl: $pageData['heroImage'],
            pixelWidth: 3840,
        );

        $pageData['heroImage'] = $this->urlGenerator->generateIfNotFullyQualified(
            pathOrUrl: $pageData['heroImage'],
        );

        return $pageData;
    }
}
