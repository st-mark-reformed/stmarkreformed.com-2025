<?php

declare(strict_types=1);

namespace App\Pages\Page;

use Assert\Assert;

use function array_map;
use function explode;
use function is_numeric;

readonly class PagePath
{
    /** @var string[] */
    public array $segments;

    public function __construct(public string $value)
    {
        if ($this->value === '') {
            $this->segments = [];

            return;
        }

        $this->segments = explode('/', $value);

        array_map(
            static function ($segment): void {
                $split = explode('-', $segment);

                array_map(
                    static function ($splitSeg): void {
                        if (is_numeric($splitSeg)) {
                            return;
                        }

                        Assert::that($splitSeg)->alnum(
                            'Path must be alpha numeric with dash separators',
                        );
                    },
                    $split,
                );
            },
            $this->segments,
        );
    }

    public function segmentAt(int $index): string
    {
        return $this->segments[$index];
    }

    public function findSegmentAt(int $index): string|null
    {
        return $this->segments[$index] ?? null;
    }
}
