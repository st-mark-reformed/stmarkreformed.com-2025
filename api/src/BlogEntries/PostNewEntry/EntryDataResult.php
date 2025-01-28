<?php

declare(strict_types=1);

namespace App\BlogEntries\PostNewEntry;

use App\EmptyUuid;
use App\Pages\Page\PageName;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use Throwable;

use function count;

readonly class EntryDataResult
{
    public bool $isValid;

    /** @var string[] */
    public array $errors;

    public UuidInterface $blogPageId;

    public PageName $entryName;

    public function __construct(
        string $blogPageId,
        string $entryName,
    ) {
        $errors = [];

        $entryNameObject = new PageName('NoOp');

        $blogPageIdObject = new EmptyUuid();

        if ($entryName === '') {
            $errors[] = 'Entry name must be provided';
        } else {
            try {
                $entryNameObject = new PageName($entryName);
            } catch (Throwable $e) {
                $errors[] = $e->getMessage();
            }
        }

        if ($blogPageId === '') {
            $errors[] = 'Blog page ID must be provided';
        } else {
            try {
                $blogPageIdObject = Uuid::fromString($blogPageId);
            } catch (Throwable $e) {
                $errors[] = $e->getMessage();
            }
        }

        $this->isValid = count($errors) < 1;

        $this->errors = $errors;

        $this->blogPageId = $blogPageIdObject;

        $this->entryName = $entryNameObject;
    }
}
