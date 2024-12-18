<?php

declare(strict_types=1);

namespace App\Pages\PatchPagesPosition;

use App\EmptyUuid;
use Psr\Http\Message\ServerRequestInterface;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;

use function array_walk;
use function count;
use function is_array;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification

class PageCollectionFactory
{
    /** @var Page[] */
    private array $pages = [];

    public function fromRequest(ServerRequestInterface $request): PageCollection
    {
        $this->pages = [];

        $submittedData = $request->getParsedBody();
        $submittedData = is_array($submittedData) ? $submittedData : [];

        array_walk(
            $submittedData,
            function (array $item): void {
                $this->processSubmittedItem($item);
            },
        );

        return new PageCollection($this->pages);
    }

    /** @phpstan-ignore-next-line */
    private function processSubmittedItem(
        array $item,
        UuidInterface $parentId = new EmptyUuid(),
    ): void {
        $id = Uuid::fromString($item['id']);

        $this->pages[] = new Page(
            $id,
            $parentId,
            count($this->pages) + 1,
        );

        $children = $item['children'] ?? [];
        $children = is_array($children) ? $children : [];

        array_walk($children, function (
            array $item,
        ) use ($id): void {
            $this->processSubmittedItem(
                $item,
                $id,
            );
        });
    }
}
