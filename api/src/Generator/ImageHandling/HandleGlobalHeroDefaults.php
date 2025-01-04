<?php

declare(strict_types=1);

namespace App\Generator\ImageHandling;

use App\ImageHandling\Resizing\ImageResizeHandler;
use App\UrlGenerator;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class HandleGlobalHeroDefaults
{
    public function __construct(
        private UrlGenerator $urlGenerator,
        private ImageResizeHandler $imageResizeHandler,
    ) {
    }

    /** @phpstan-ignore-next-line */
    public function handle(array $globalData): array
    {
        $globalData['json']['heroImage'] ??= '';

        if ($globalData['json']['heroImage'] === '') {
            return $globalData;
        }

        $globalData['json']['heroImage1x'] = $this->imageResizeHandler->resizeToWidth(
            pathOrUrl: $globalData['json']['heroImage'],
            pixelWidth: 1920,
        );

        $globalData['json']['heroImage2x'] = $this->imageResizeHandler->resizeToWidth(
            pathOrUrl: $globalData['json']['heroImage'],
            pixelWidth: 3840,
        );

        $globalData['json']['heroImage'] = $this->urlGenerator->generateIfNotFullyQualified(
            pathOrUrl: $globalData['json']['heroImage'],
        );

        return $globalData;
    }
}
