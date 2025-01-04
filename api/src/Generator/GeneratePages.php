<?php

declare(strict_types=1);

namespace App\Generator;

use App\Generator\ImageHandling\HandlePageCustomHero;
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
use function json_encode;
use function mb_strlen;
use function mb_substr;

class GeneratePages
{
    /** @var string[] */
    private array $paths = [];

    public function __construct(
        private readonly Redis $redis,
        private readonly PageRepository $pageRepository,
        private readonly HandlePageCustomHero $handlePageCustomHero,
    ) {
    }

    public function __invoke(): void
    {
        $this->generate();
    }

    public function generate(): void
    {
        $this->paths = [];

        $pages = $this->pageRepository->findAllPages();

        $pages->walkAll(fn (Page $p) => $this->handle($p));

        $this->cleanUnused();
    }

    private function handle(Page $page): void
    {
        if ($page->status !== PageStatus::published) {
            return;
        }

        $this->paths[] = $page->path->value;

        // TODO handle page types, blogs/entries/podcasts/pagination etc.

        $pageData = $page->asScalarArray(
            new PagePropertyCollection([
                PageProperty::children,
            ]),
        );

        $pageData = $this->handlePageCustomHero->handle($pageData);

        $this->redis->set(
            'static_page_data:' . $page->path->value,
            json_encode($pageData),
        );
    }

    private function cleanUnused(): void
    {
        $keyPrefix = 'static_page_data:';

        $redisKeys = $this->redis->keys($keyPrefix . '*');

        $existingKeys = array_map(
            static fn (string $key) => mb_substr(
                $key,
                mb_strlen($keyPrefix),
            ),
            $redisKeys,
        );

        $removeKeys = array_filter(
            $existingKeys,
            fn (string $key) => ! in_array(
                $key,
                $this->paths,
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
