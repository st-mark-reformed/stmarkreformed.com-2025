<?php

declare(strict_types=1);

namespace App\Globals\PatchGlobal;

use App\Globals\Global\GlobalItem;
use App\ImageHandling\Base64ImageFactory;
use App\ImageHandling\CleanUnusedFiles;
use App\ImageHandling\Directory;
use App\ImageHandling\SaveBase64ImageToDisk;
use SplFileInfo;

use function array_keys;
use function array_map;
use function in_array;
use function mb_strpos;

class ParseImageUploads
{
    private const array IMAGE_FIELDS = [
        'heroDefaults' => ['heroImage'],
    ];

    public function __construct(
        private readonly CleanUnusedFiles $cleanUnusedFiles,
        private readonly Base64ImageFactory $base64ImageFactory,
        private readonly SaveBase64ImageToDisk $saveBase64ImageToDisk,
    ) {
    }

    /** @var string[] */
    private array $globalImages = [];

    public function fromGlobal(GlobalItem $global): GlobalItem
    {
        $this->globalImages = [];

        $globalsWithImageFields = array_keys(self::IMAGE_FIELDS);

        $slug = $global->slug->value;

        $globalHasImages = in_array(
            $slug,
            $globalsWithImageFields,
            true,
        );

        if (! $globalHasImages) {
            return $global;
        }

        $json = $global->json->data;

        foreach (self::IMAGE_FIELDS[$slug] as $field) {
            $fieldData = $json[$field] ?? '';

            $json[$field] = $this->parseImageData(
                $fieldData,
                $slug,
            );
        }

        $this->cleanUnused($slug);

        return $global->withJson($json);
    }

    private function parseImageData(
        string $imageData,
        string $globalSlug,
    ): string {
        $dataPos = mb_strpos($imageData, 'data:');

        if ($dataPos === false) {
            if ($imageData !== '') {
                $this->globalImages[] = $imageData;
            }

            return $imageData;
        }

        $image = $this->base64ImageFactory->createFromDataUri(
            $imageData,
        );

        $imageData = $this->saveBase64ImageToDisk->fromBase64(
            $image,
            Directory::UPLOADS,
            'globals/' . $globalSlug,
        );

        $this->globalImages[] = $imageData;

        return $imageData;
    }

    private function cleanUnused(string $globalSlug): void
    {
        $this->cleanUnusedFiles->inIdDirectory(
            array_map(
                static fn (
                    string $path,
                ) => (new SplFileInfo($path))->getFilename(),
                $this->globalImages,
            ),
            Directory::UPLOADS,
            'globals/' . $globalSlug,
        );
    }
}
