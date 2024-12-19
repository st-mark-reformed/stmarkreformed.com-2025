<?php

declare(strict_types=1);

namespace App\ImageHandling;

use Symfony\Component\Filesystem\Filesystem;

use function count;
use function implode;
use function in_array;

readonly class CleanUnusedFiles
{
    public function __construct(
        private Filesystem $filesystem,
        private FinderFactory $finderFactory,
    ) {
    }

    /** @param string[] $usedFilenames */
    public function inIdDirectory(
        array $usedFilenames,
        Directory $directory,
        string $path,
    ): void {
        $dirPath = implode('/', [
            $directory->absolutePath(),
            $path,
        ]);

        if (! $this->filesystem->exists($dirPath)) {
            return;
        }

        $finder = $this->finderFactory->create()->files()->in($dirPath);

        if (! $finder->hasResults()) {
            $this->filesystem->remove($dirPath);

            return;
        }

        $removeFiles = [];

        foreach ($finder as $file) {
            $fileName = $file->getFilename();

            if (
                in_array(
                    $fileName,
                    $usedFilenames,
                    true,
                )
            ) {
                continue;
            }

            $removeFiles[] = $file->getPathname();
        }

        if (count($removeFiles) < 1) {
            return;
        }

        $this->filesystem->remove($removeFiles);

        $finder = $this->finderFactory->create()->files()->in($dirPath);

        if ($finder->hasResults()) {
            return;
        }

        $this->filesystem->remove($dirPath);
    }
}
