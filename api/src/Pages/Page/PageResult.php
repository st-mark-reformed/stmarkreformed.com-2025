<?php

declare(strict_types=1);

namespace App\Pages\Page;

readonly class PageResult
{
    public bool $hasPage;

    public Page $page;

    public function __construct(Page|null $page = null)
    {
        if ($page === null) {
            $this->hasPage = false;

            $this->page = new Page();

            return;
        }

        $this->hasPage = true;

        $this->page = $page;
    }
}
