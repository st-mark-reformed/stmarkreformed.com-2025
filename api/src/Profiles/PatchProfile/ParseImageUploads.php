<?php

declare(strict_types=1);

namespace App\Profiles\PatchProfile;

use App\ImageHandling\Base64ImageFactory;
use App\ImageHandling\CleanUnusedFiles;
use App\ImageHandling\Directory;
use App\ImageHandling\SaveBase64ImageToDisk;
use App\Profiles\Profile\Profile;
use SplFileInfo;

use function array_map;
use function mb_strpos;

class ParseImageUploads
{
    public function __construct(
        private readonly CleanUnusedFiles $cleanUnusedFiles,
        private readonly Base64ImageFactory $base64ImageFactory,
        private readonly SaveBase64ImageToDisk $saveBase64ImageToDisk,
    ) {
    }

    /** @var string[] */
    private array $profileImages = [];

    public function fromProfile(Profile $profile): Profile
    {
        $this->profileImages = [];

        $id = $profile->id->toString();

        $profile = $profile->withPhoto($this->parseImageData(
            $profile->photo->value,
            $id,
        ));

        $this->cleanUnused($id);

        return $profile;
    }

    private function parseImageData(string $imageData, string $id): string
    {
        $dataPos = mb_strpos($imageData, 'data:');

        if ($dataPos === false) {
            if ($imageData !== '') {
                $this->profileImages[] = $imageData;
            }

            return $imageData;
        }

        $image = $this->base64ImageFactory->createFromDataUri(
            $imageData,
        );

        $imageData = $this->saveBase64ImageToDisk->fromBase64(
            $image,
            Directory::UPLOADS,
            'profiles/' . $id,
        );

        $this->profileImages[] = $imageData;

        return $imageData;
    }

    private function cleanUnused(string $id): void
    {
        $this->cleanUnusedFiles->inIdDirectory(
            array_map(
                static fn (
                    string $path,
                ) => (new SplFileInfo($path))->getFilename(),
                $this->profileImages,
            ),
            Directory::UPLOADS,
            'profiles/' . $id,
        );
    }
}
