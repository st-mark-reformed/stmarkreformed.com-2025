<?php

declare(strict_types=1);

namespace App\Pages\PostNewPage;

use App\Pages\PageRepository;
use App\Persistence\Result;

readonly class CreatePage
{
    public function __construct(private PageRepository $repository)
    {
    }

    public function create(PageNameResult $pageNameResult): Result
    {
        if (! $pageNameResult->isValid) {
            return new Result(
                false,
                $pageNameResult->errors,
            );
        }

        return $this->repository->createNewPage(
            $pageNameResult->pageName,
        );
    }
}
