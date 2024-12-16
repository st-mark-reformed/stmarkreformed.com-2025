<?php

declare(strict_types=1);

namespace App\Pages\Page;

use RuntimeException;
use Throwable;

use function constant;
use function implode;

enum PageType
{
    case page;
    case page_builder;
    case calendar;
    case blog_entries;
    case podcast_entries;
    case menu_link;
    case menu_parent_only;

    public static function fromString(string $type): PageType
    {
        try {
            /** @phpstan-ignore-next-line */
            return constant('self::' . $type);
        } catch (Throwable) {
            throw new RuntimeException(implode('', [
                'Case "',
                $type,
                '" does not exist on "',
                PageType::class,
                '" enum',
            ]));
        }
    }

    public function humanReadable(): string
    {
        return match ($this) {
            PageType::page => 'Page',
            PageType::page_builder => 'Page Builder',
            PageType::calendar => 'Calendar',
            PageType::blog_entries => 'Blog Entries',
            PageType::podcast_entries => 'Podcast Entries',
            PageType::menu_link => 'Menu Link',
            PageType::menu_parent_only => 'Menu Parent Only',
        };
    }
}
