<?php

declare(strict_types=1);

namespace App\ImageHandling;

use Ramsey\Uuid\UuidFactory;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Path;

use function implode;

readonly class SaveBase64ImageToDisk
{
    public function __construct(
        private Filesystem $filesystem,
        private UuidFactory $uuidFactory,
    ) {
    }

    public function fromBase64(
        Base64Image $base64Image,
        Directory $directory,
        string $path,
    ): string {
        $fileName = $base64Image->createFilename(
            $this->uuidFactory->uuid4()->toString(),
        );

        $absolutePath = implode('/', [
            $directory->absolutePath(),
            $path,
            $fileName,
        ]);

        $relativePath = implode('/', [
            $directory->relativePath(),
            $path,
            $fileName,
        ]);

        $this->filesystem->dumpFile(
            Path::normalize($absolutePath),
            $base64Image->getDecodedContent(),
        );

        return Path::normalize($relativePath);
    }
}
