<?php

declare(strict_types=1);

namespace App\Generator;

use App\Generator\ImageHandling\HandlePageCustomHero;
use App\Generator\ImageHandling\PageBuilder\HandleImageContentCta;
use App\Generator\PageBuilderBlockHandlers\UpcomingEventsHandler;
use App\Pages\Page\Page;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageStatus;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use Redis;

use function array_filter;
use function array_map;
use function array_merge;
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
        private readonly GenerateBlogPages $generateBlogPages,
        private readonly HandlePageCustomHero $handlePageCustomHero,
        private readonly HandleImageContentCta $handleImageContentCta,
        private readonly GenerateCalendarPages $generateCalendarPages,
        private readonly UpcomingEventsHandler $upcomingEventsHandler,
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

        $page = $page->withJsonObject($page->json->mapToNew(
            function (array $json): array {
                return match ($json['type']) {
                    'CTAs_ImageContentCta' => $this->handleImageContentCta->handle(
                        $json,
                    ),
                    default => $json,
                };
            },
        ));

        // TODO handle page types, blogs/entries/podcasts/pagination etc.

        /** @noinspection PhpUncoveredEnumCasesInspection */
        switch ($page->type) {
            case PageType::calendar:
                $this->paths = array_merge(
                    $this->paths,
                    $this->generateCalendarPages->fromPage(
                        $page,
                    ),
                );
                break;
            case PageType::blog_entries:
                $this->paths = array_merge(
                    $this->paths,
                    $this->generateBlogPages->fromPage(
                        $page,
                    ),
                );

                return;
        }

        $pageData = $page->asScalarArray(
            new PagePropertyCollection([
                PageProperty::children,
            ]),
        );

        $pageData = $this->handlePageCustomHero->handle($pageData);

        $pageData['json'] = $this->upcomingEventsHandler->handle(
            $pageData['json'],
        );

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
