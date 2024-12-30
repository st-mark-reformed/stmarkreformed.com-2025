<?php

declare(strict_types=1);

namespace App\Pages\Page;

use Ramsey\Uuid\UuidInterface;
use RuntimeException;

use function array_map;
use function array_merge;
use function array_values;
use function count;
use function max;

readonly class PageCollection
{
    /** @var Page[] */
    private array $pages;

    /** @param Page[] $pages */
    public function __construct(array $pages = [])
    {
        $this->pages = array_values(array_map(
            static fn (Page $p) => $p,
            $pages,
        ));
    }

    public function totalPages(): int
    {
        $runningTotal = 0;

        $this->walkAll(static function () use (&$runningTotal): void {
            $runningTotal += 1;
        });

        return $runningTotal;
    }

    public function lastPagePosition(): int
    {
        $allPositions = [];

        $this->walkAll(static function (
            Page $page,
        ) use (&$allPositions): void {
            $allPositions[] = $page->position;
        });

        if (count($allPositions) < 1) {
            return 0;
        }

        return max($allPositions);
    }

    public function filter(callable $callback): PageCollection
    {
        return new PageCollection(
            $this->filterInterior($callback, $this->pages),
        );
    }

    /**
     * @param Page[] $pages
     *
     * @return Page[]
     */
    private function filterInterior(callable $callback, array $pages): array
    {
        $return = [];

        foreach ($pages as $page) {
            $results = $callback($page);

            if (! $results) {
                continue;
            }

            $page = $page->withChildren($this->filterInterior(
                $callback,
                $page->children->pages,
            ));

            $return[] = $page;
        }

        return $return;
    }

    /** @return mixed[] */
    public function mapAll(callable $callback): array
    {
        return $this->mapAllInterior($callback, $this->pages);
    }

    /**
     * @param Page[] $pages
     *
     * @return mixed[]
     */
    private function mapAllInterior(callable $callback, array $pages): array
    {
        $return = [];

        foreach ($pages as $page) {
            $results = $callback($page);

            $results['children'] = $this->mapAllInterior(
                $callback,
                $page->children->pages,
            );

            $return[] = $results;
        }

        return $return;
    }

    public function walkAll(callable $callback): void
    {
        $this->walkAllInterior($callback, $this->pages);
    }

    /** @param Page[] $pages */
    private function walkAllInterior(callable $callback, array $pages): void
    {
        foreach ($pages as $page) {
            $callback($page);

            $this->walkAllInterior(
                $callback,
                $page->children->pages,
            );
        }
    }

    /** @return mixed[] */
    public function asScalarArray(
        PagePropertyCollection $omit = new PagePropertyCollection(),
    ): array {
        return array_map(
            static fn (Page $p) => $p->asScalarArray($omit),
            $this->pages,
        );
    }

    public function findOneById(UuidInterface $id): PageResult
    {
        return $this->findOneByIdInternal($id, $this);
    }

    private function findOneByIdInternal(
        UuidInterface $id,
        PageCollection $pages,
    ): PageResult {
        foreach ($pages->pages as $page) {
            if ($page->id->equals($id)) {
                return new PageResult($page);
            }

            $childResult = $this->findOneByIdInternal(
                $id,
                $page->children,
            );

            if ($childResult->hasPage) {
                return $childResult;
            }
        }

        return new PageResult();
    }

    public function getOneById(UuidInterface $id): Page
    {
        $found = $this->findOneById($id);

        if (! $found->hasPage) {
            throw new RuntimeException('Page not found');
        }

        return $found->page;
    }

    public function findAllByPageType(PageType $type): PageCollection
    {
        return $this->findAllByPageTypeInternal($type, $this);
    }

    private function findAllByPageTypeInternal(
        PageType $type,
        PageCollection $pages,
    ): PageCollection {
        $foundPages = [];

        foreach ($pages->pages as $page) {
            if ($page->type->name === $type->name) {
                $foundPages[] = $page;
            }

            $childResult = $this->findAllByPageTypeInternal(
                $type,
                $page->children,
            );

            $foundPages = array_merge(
                $foundPages,
                $childResult->pages,
            );
        }

        return new PageCollection($foundPages);
    }
}
