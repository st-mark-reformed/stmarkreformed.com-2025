<?php

declare(strict_types=1);

namespace App\Pages\Generator;

use App\Pages\Page\Page;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageStatus;
use App\Pages\PageRepository;
use Redis;

use function array_filter;
use function array_map;
use function count;
use function in_array;
use function mb_strlen;
use function mb_substr;

class GenerateSiteData
{
    public function __construct(
        private readonly Redis $redis,
        private readonly PageRepository $repository,
    ) {
    }

    /** @var string[] */
    private array $pagePaths = [];

    public function __invoke(): void
    {
        $this->generate();
    }

    public function generate(): void
    {
        $this->pagePaths = [];

        $pages = $this->repository->findAllPages();

        $pages->walkAll(fn (Page $p) => $this->handlePage($p));

        $this->cleanUnused();
    }

    private function handlePage(Page $page): void
    {
        if ($page->status !== PageStatus::published) {
            return;
        }

        $this->pagePaths[] = $page->path->value;

        // TODO handle page types, blogs/entries/podcasts/pagination etc.

        $this->redis->set(
            'static_page_data:' . $page->path->value,
            $page->asScalarArray(
                new PagePropertyCollection([
                    PageProperty::children,
                ]),
            ),
        );
    }

    private function cleanUnused(): void
    {
        $keyPrefix = 'static_page_data:';

        $redisPageKeys = $this->redis->keys($keyPrefix . '*');

        $existingKeys = array_map(
            static fn (string $key) => mb_substr($key, mb_strlen($keyPrefix)),
            $redisPageKeys,
        );

        $removeKeys = array_filter(
            $existingKeys,
            fn (string $key) => ! in_array(
                $key,
                $this->pagePaths,
                true,
            ),
        );

        if (count($removeKeys) < 1) {
            return;
        }

        array_map(
            function (string $key) use ($keyPrefix): void {
                $this->redis->del($keyPrefix . $key);
            },
            $removeKeys,
        );
    }
}
