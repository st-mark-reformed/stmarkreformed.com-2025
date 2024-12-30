<?php

declare(strict_types=1);

namespace App\Pages\Generator;

use App\Globals\Global\GlobalItem;
use App\Globals\GlobalRepository;
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
    public const string JOB_HANDLE = 'generate-site-data';

    public const string JOB_NAME = 'Generate Site Data';

    public function __construct(
        private readonly Redis $redis,
        private readonly PageRepository $pageRepository,
        private readonly GlobalRepository $globalRepository,
    ) {
    }

    /** @var string[] */
    private array $paths = [];

    public function __invoke(): void
    {
        $this->generate();
    }

    public function generate(): void
    {
        $this->paths = [];

        $pages = $this->pageRepository->findAllPages();
        $pages->walkAll(fn (Page $p) => $this->handlePage($p));
        $this->cleanUnusedPages();

        $globals = $this->globalRepository->findAllGlobals();
        $globals->walkAll(
            fn (GlobalItem $g) => $this->handleGlobal($g),
        );
        $this->cleanUnusedGlobals();
    }

    private function handlePage(Page $page): void
    {
        if ($page->status !== PageStatus::published) {
            return;
        }

        $this->paths[] = $page->path->value;

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

    private function cleanUnusedPages(): void
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

    private function handleGlobal(GlobalItem $global): void
    {
        $this->paths[] = $global->slug->value;

        $this->redis->set(
            'static_global_data:' . $global->slug->value,
            $global->asScalarArray(),
        );
    }

    private function cleanUnusedGlobals(): void
    {
        $keyPrefix = 'static_global_data:';

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
