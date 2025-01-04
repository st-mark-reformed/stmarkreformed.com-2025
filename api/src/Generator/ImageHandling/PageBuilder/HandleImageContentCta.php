<?php

declare(strict_types=1);

namespace App\Generator\ImageHandling\PageBuilder;

use App\ImageHandling\Resizing\ImageResizeHandler;
use App\UrlGenerator;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

readonly class HandleImageContentCta
{
    public function __construct(
        private UrlGenerator $urlGenerator,
        private ImageResizeHandler $imageResizeHandler,
    ) {
    }

    /** @phpstan-ignore-next-line */
    public function handle(array $data): array
    {
        $data['image']   ??= '';
        $data['image1x'] ??= '';
        $data['image2x'] ??= '';

        if ($data['image'] === '') {
            return $data;
        }

        $data['image1x'] = $this->imageResizeHandler->resizeToHeight(
            pathOrUrl: $data['image'],
            pixelHeight: 720,
        );

        $data['image2x'] = $this->imageResizeHandler->resizeToHeight(
            pathOrUrl: $data['image'],
            pixelHeight: 1440,
        );

        $data['image'] = $this->urlGenerator->generateIfNotFullyQualified(
            pathOrUrl: $data['image'],
        );

        return $data;
    }
}
