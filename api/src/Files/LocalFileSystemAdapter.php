<?php

declare(strict_types=1);

namespace App\Files;

use League\Flysystem\PathPrefixer;
use League\Flysystem\UnixVisibility\VisibilityConverter;
use League\MimeTypeDetection\MimeTypeDetector;

use const DIRECTORY_SEPARATOR;
use const LOCK_EX;

class LocalFileSystemAdapter extends \League\Flysystem\Local\LocalFilesystemAdapter
{
    public PathPrefixer $prefixer;

    public function __construct(
        string $location,
        VisibilityConverter|null $visibility = null,
        int $writeFlags = LOCK_EX,
        int $linkHandling = self::DISALLOW_LINKS,
        MimeTypeDetector|null $mimeTypeDetector = null,
        bool $lazyRootCreation = false,
        bool $useInconclusiveMimeTypeFallback = false,
    ) {
        $this->prefixer = new PathPrefixer(
            $location,
            DIRECTORY_SEPARATOR,
        );

        parent::__construct(
            $location,
            $visibility,
            $writeFlags,
            $linkHandling,
            $mimeTypeDetector,
            $lazyRootCreation,
            $useInconclusiveMimeTypeFallback,
        );
    }
}
