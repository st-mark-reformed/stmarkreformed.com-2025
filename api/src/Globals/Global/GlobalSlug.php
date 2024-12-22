<?php

declare(strict_types=1);

namespace App\Globals\Global;

use Assert\Assert;

use function array_map;
use function explode;
use function is_numeric;

readonly class GlobalSlug
{
    public function __construct(public string $value)
    {
        if ($value === '') {
            return;
        }

        $split = explode('-', $value);

        array_map(
            static function ($splitSeg): void {
                if (is_numeric($splitSeg)) {
                    return;
                }

                Assert::that($splitSeg)->alnum(
                    'Slug must be alpha numeric with dash separators',
                );
            },
            $split,
        );
    }
}
