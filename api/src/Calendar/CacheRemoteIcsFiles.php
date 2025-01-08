<?php

declare(strict_types=1);

namespace App\Calendar;

use App\Pages\Page\Page;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use Hyperf\Guzzle\ClientFactory;
use Redis;

readonly class CacheRemoteIcsFiles
{
    public function __construct(
        private Redis $redis,
        private PageRepository $pageRepository,
        private ClientFactory $guzzleClientFactory,
    ) {
    }

    public function __invoke(): void
    {
        $this->cache();
    }

    public function cache(): void
    {
        $this->pageRepository->findAllPages()->walkAll(
            function (Page $page): void {
                if ($page->type !== PageType::calendar) {
                    return;
                }

                $this->processPage($page);
            },
        );
    }

    private function processPage(Page $page): void
    {
        $requestResponse = $this->guzzleClientFactory->create()->get(
            $page->data->value,
        );

        $this->redis->set(
            'static_ics_data:' . $page->path->value,
            $requestResponse->getBody()->getContents(),
        );
    }
}
