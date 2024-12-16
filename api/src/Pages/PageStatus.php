<?php

declare(strict_types=1);

namespace App\Pages;

use RuntimeException;
use Throwable;

use function constant;
use function implode;

enum PageStatus
{
    case published;
    case unpublished;

    public static function fromString(string $status): PageStatus
    {
        try {
            /** @phpstan-ignore-next-line */
            return constant('self::' . $status);
        } catch (Throwable) {
            throw new RuntimeException(implode('', [
                '"',
                $status,
                '" is not a valid Page Status"',
            ]));
        }
    }
}
