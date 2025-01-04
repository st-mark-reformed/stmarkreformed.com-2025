<?php

declare(strict_types=1);

namespace App\Files;

use League\Flysystem\Filesystem;
use League\Flysystem\PathNormalizer;
use League\Flysystem\UrlGeneration\PublicUrlGenerator;
use League\Flysystem\UrlGeneration\TemporaryUrlGenerator;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification

abstract class CustomFilesystem extends Filesystem
{
    /** @phpstan-ignore-next-line */
    public function __construct(
        public readonly LocalFileSystemAdapter $adapter,
        array $config = [],
        PathNormalizer|null $pathNormalizer = null,
        PublicUrlGenerator|null $publicUrlGenerator = null,
        TemporaryUrlGenerator|null $temporaryUrlGenerator = null,
    ) {
        parent::__construct(
            $adapter,
            $config,
            $pathNormalizer,
            $publicUrlGenerator,
            $temporaryUrlGenerator,
        );
    }
}
