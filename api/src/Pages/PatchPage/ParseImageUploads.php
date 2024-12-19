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

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

class ParseImageUploads
{
    // 'blocktype' => ['keys', 'keys2]
    private const array IMAGE_KEYS = [
        'CTAs_ImageContentCta' => ['image'],
    ];

    public function __construct(
        private readonly CleanUnusedFiles $cleanUnusedFiles,
        private readonly Base64ImageFactory $base64ImageFactory,
        private readonly SaveBase64ImageToDisk $saveBase64ImageToDisk,
    ) {
    }

    /** @var string[] */
    private array $pageImages = [];

    public function fromPage(Page $page): Page
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

        foreach (self::IMAGE_KEYS as $blockType => $keys) {
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
