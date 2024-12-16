<?php

declare(strict_types=1);

namespace App\Pages\PostNewPage;

use App\Pages\Page\PageName;
use Throwable;

readonly class PageNameResult
{
    public bool $isValid;

    /** @var string[] */
    public array $errors;

    public PageName $pageName;

    public function __construct(string $pageName)
    {
        if ($pageName === '') {
            $this->isValid = false;

            $this->pageName = new PageName('NoOp');

            $this->errors = ['Page name cannot be empty'];

            return;
        }

        try {
            $this->pageName = new PageName($pageName);

            $this->errors = [];

            $this->isValid = true;
        } catch (Throwable $e) {
            $this->isValid = false;

            $this->pageName = new PageName('NoOp');

            $this->errors = [$e->getMessage()];
        }
    }
}
