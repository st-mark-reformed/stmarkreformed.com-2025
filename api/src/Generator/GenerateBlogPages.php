<?php

declare(strict_types=1);

namespace App\Generator;

use App\BlogEntries\Entry\Entry;
use App\BlogEntries\Entry\EntryProperty;
use App\BlogEntries\Entry\EntryPropertyCollection;
use App\BlogEntries\EntryRepository;
use App\BlogEntries\Persistence\StatusCollection;
use App\Generator\ImageHandling\HandlePageCustomHero;
use App\Generator\ImageHandling\PageBuilder\HandleImageContentCta;
use App\Generator\PageBuilderBlockHandlers\UpcomingEventsHandler;
use App\Pages\Page\Page;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageStatus;
use App\Pages\Page\PageType;
use Redis;

use function json_encode;

class GenerateBlogPages
{
    /** @var string[] */
    private array $paths = [];

    // TODO: Set appropriate amount of per page
    public const int PER_PAGE = 30;

    public function __construct(
        private readonly Redis $redis,
        private readonly EntryRepository $entryRepository,
        private readonly HandlePageCustomHero $handlePageCustomHero,
        private readonly UpcomingEventsHandler $upcomingEventsHandler,
        private readonly HandleImageContentCta $handleImageContentCta,
    ) {
    }

    /** @return string[] a list of paths generated */
    public function fromPage(Page $page): array
    {
        if (
            $page->status !== PageStatus::published ||
            $page->type !== PageType::blog_entries
        ) {
            return [];
        }

        $this->paths = [];

        $count = $this->entryRepository->countEntries(
            blogPageId: $page->id,
            statuses: new StatusCollection([PageStatus::published]),
        );

        $count->walkTotalPages(
            perPage: self::PER_PAGE,
            callback: [$this, 'fromPageNumber'],
            arguments: [$page],
        );

        return $this->paths;
    }

    public function fromPageNumber(
        int $pageNumber,
        int $totalPages,
        int $totalEntries,
        Page $page,
    ): void {
        if (
            $page->status !== PageStatus::published ||
            $page->type !== PageType::blog_entries
        ) {
            return;
        }

        $entriesResult = $this->entryRepository->findEntries(
            blogPageId: $page->id,
            limit: self::PER_PAGE,
            offset: ($pageNumber - 1) * self::PER_PAGE,
            statuses: new StatusCollection([PageStatus::published]),
        );

        $pageData = $page->asScalarArray(
            new PagePropertyCollection([
                PageProperty::children,
            ]),
        );

        $pageData['blogEntriesData'] = [
            'entries' => $entriesResult->asScalarArray(
                new EntryPropertyCollection([
                    EntryProperty::blogPage,
                    EntryProperty::useShortHero,
                    EntryProperty::useCustomHero,
                    EntryProperty::heroDarkeningOverlayOpacity,
                    EntryProperty::heroImage,
                    EntryProperty::heroUpperCta,
                    EntryProperty::heroHeading,
                    EntryProperty::heroSubheading,
                    EntryProperty::heroParagraph,
                ]),
            ),
            'pageNumber' => $pageNumber,
            'totalPages' => $totalPages,
            'totalEntries' => $totalEntries,
            'totalOnThisPage' => $entriesResult->count(),
        ];

        $path = $page->path->value;

        if ($pageNumber > 1) {
            $path .= '/page/' . $pageNumber;
        }

        $this->paths[] = $path;

        $this->redis->set(
            'static_page_data:' . $path,
            json_encode($pageData),
        );

        $entriesResult->walk([$this, 'fromEntry']);
    }

    public function fromEntry(Entry $entry): void
    {
        if ($entry->status !== PageStatus::published) {
            return;
        }

        $this->paths[] = $entry->path->value;

        $entry = $entry->withJsonObject($entry->json->mapToNew(
            function (array $json): array {
                return match ($json['type']) {
                    'CTAs_ImageContentCta' => $this->handleImageContentCta->handle(
                        $json,
                    ),
                    default => $json,
                };
            },
        ));

        $pageData = $entry->asScalarArray();

        $pageData = $this->handlePageCustomHero->handle($pageData);

        $pageData['json'] = $this->upcomingEventsHandler->handle(
            $pageData['json'],
        );

        $this->redis->set(
            'static_page_data:' . $entry->path->value,
            json_encode($pageData),
        );
    }
}
