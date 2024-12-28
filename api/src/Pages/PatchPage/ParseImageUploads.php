<?php

declare(strict_types=1);

namespace App\Pages\PatchPage;

use App\ImageHandling\Base64ImageFactory;
use App\ImageHandling\CleanUnusedFiles;
use App\ImageHandling\Directory;
use App\ImageHandling\SaveBase64ImageToDisk;
use App\Pages\Page\Page;
use Ramsey\Uuid\UuidInterface;
use SplFileInfo;

use function array_map;
use function is_array;
use function mb_strpos;
use function ucfirst;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

class ParseImageUploads
{
    private const array IMAGE_FIELDS = ['heroImage'];

    // 'blocktype' => ['keys', 'keys2]
    private const array JSON_IMAGE_KEYS = [
        'CTAs_ImageContentCta' => ['image'],
    ];

    public function __construct(
        private readonly CleanUnusedFiles $cleanUnusedFiles,
        private readonly Base64ImageFactory $base64ImageFactory,
        private readonly SaveBase64ImageToDisk $saveBase64ImageToDisk,
    ) {
    }

    public function fromPageFields(Page $page): Page
    {
        foreach (self::IMAGE_FIELDS as $field) {
            $this->pageImages = [];

            /** @phpstan-ignore-next-line */
            $page = $page->{'with' . ucfirst($field)}(
                $this->parseFieldImageData(
                    /** @phpstan-ignore-next-line */
                    $page->{$field},
                    $field,
                    $page->id,
                )
            );

            $this->cleanUnusedFromFieldDirectory(
                $field,
                $page->id,
            );
        }

        return $page;
    }

    /** @var string[] */
    private array $pageImages = [];

    public function fromPageJson(Page $page): Page
    {
        $this->pageImages = [];

        $json = $page->json->data;

        foreach ($json as $index => $block) {
            if (! is_array($block)) {
                continue;
            }

            $json[$index] = $this->parseBlock($block, $page->id);
        }

        $this->cleanUnused($page->id);

        return $page->withJson($json);
    }

    /** @phpstan-ignore-next-line */
    private function parseBlock(array $block, UuidInterface $pageId): array
    {
        $thisType = $block['type'] ?? '';

        foreach (self::JSON_IMAGE_KEYS as $blockType => $keys) {
            if ($thisType !== $blockType) {
                continue;
            }

            foreach ($keys as $key) {
                $block[$key] = $this->parseImageData(
                    (string) ($block[$key] ?? ''),
                    $pageId,
                );
            }
        }

        return $block;
    }

    private function parseFieldImageData(
        string $imageData,
        string $fieldName,
        UuidInterface $pageId,
    ): string {
        $dataPos = mb_strpos($imageData, 'data:');

        if ($dataPos === false) {
            if ($imageData !== '') {
                $this->pageImages[] = $imageData;
            }

            return $imageData;
        }

        $image = $this->base64ImageFactory->createFromDataUri(
            $imageData,
        );

        $imageData = $this->saveBase64ImageToDisk->fromBase64(
            $image,
            Directory::UPLOADS,
            'pages/' . $fieldName . '/' . $pageId->toString(),
        );

        $this->pageImages[] = $imageData;

        return $imageData;
    }

    private function parseImageData(
        string $imageData,
        UuidInterface $pageId,
    ): string {
        $dataPos = mb_strpos($imageData, 'data:');

        if ($dataPos === false) {
            if ($imageData !== '') {
                $this->pageImages[] = $imageData;
            }

            return $imageData;
        }

        $image = $this->base64ImageFactory->createFromDataUri(
            $imageData,
        );

        $imageData = $this->saveBase64ImageToDisk->fromBase64(
            $image,
            Directory::UPLOADS,
            'pages/' . $pageId->toString(),
        );

        $this->pageImages[] = $imageData;

        return $imageData;
    }

    private function cleanUnusedFromFieldDirectory(
        string $fieldName,
        UuidInterface $pageId,
    ): void {
        $this->cleanUnusedFiles->inIdDirectory(
            array_map(
                static fn (
                    string $path,
                ) => (new SplFileInfo($path))->getFilename(),
                $this->pageImages,
            ),
            Directory::UPLOADS,
            'pages/' . $fieldName . '/' . $pageId->toString(),
        );
    }

    private function cleanUnused(UuidInterface $pageId): void
    {
        $this->cleanUnusedFiles->inIdDirectory(
            array_map(
                static fn (
                    string $path,
                ) => (new SplFileInfo($path))->getFilename(),
                $this->pageImages,
            ),
            Directory::UPLOADS,
            'pages/' . $pageId->toString(),
        );
    }
}
