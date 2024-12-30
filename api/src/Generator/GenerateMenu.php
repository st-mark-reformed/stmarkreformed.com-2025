<?php

declare(strict_types=1);

namespace App\Generator;

use App\Pages\Page\Page;
use App\Pages\Page\PageStatus;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use Redis;

use function json_encode;

// phpcs:disable SlevomatCodingStandard.ControlStructures.UselessIfConditionWithReturn.UselessIfCondition

readonly class GenerateMenu
{
    public function __construct(
        private readonly Redis $redis,
        private readonly PageRepository $pageRepository,
    ) {
    }

    public function __invoke(): void
    {
    }

    public function generate(): void
    {
        $pages = $this->pageRepository->findAllPages()->filter(
            fn (Page $page) => $this->filter($page),
        );

        $links = $pages->mapAll(
            fn (Page $page) => $this->map($page),
        );

        $this->redis->set(
            'static_menu_data',
            json_encode($links),
        );
    }

    private function filter(Page $page): bool
    {
        if ($page->status !== PageStatus::published) {
            return false;
        }

        if (
            $page->type === PageType::menu_link ||
            $page->type === PageType::menu_parent_only
        ) {
            return true;
        }

        if (! $page->showInMenu) {
            return false;
        }

        return true;
    }

    /** @return scalar[] */
    private function map(Page $page): array
    {
        $link = '/' . $page->path->value;

        if ($page->type === PageType::menu_parent_only) {
            $link = '';
        }

        if ($page->type === PageType::menu_link) {
            $link = $page->data->value;
        }

        return [
            'name' => $page->name->value,
            'link' => $link,
        ];
    }
}
