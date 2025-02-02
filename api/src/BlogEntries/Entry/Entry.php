<?php

declare(strict_types=1);

namespace App\BlogEntries\Entry;

use App\EmptyUuid;
use App\Pages\Page\Page;
use App\Pages\Page\PageData;
use App\Pages\Page\PageJson;
use App\Pages\Page\PageName;
use App\Pages\Page\PagePath;
use App\Pages\Page\PageProperty;
use App\Pages\Page\PagePropertyCollection;
use App\Pages\Page\PageSlug;
use App\Pages\Page\PageStatus;
use App\Profiles\Profile\Profile;
use DateTimeImmutable;
use DateTimeInterface;
use DateTimeZone;
use Ramsey\Uuid\UuidInterface;

readonly class Entry
{
    public function __construct(
        public UuidInterface $id = new EmptyUuid(),
        public Page $blogPage = new Page(),
        public Profile|null $author = null,
        public PageName $name = new PageName('NoOp'),
        public PageSlug $slug = new PageSlug('noop'),
        public PagePath $path = new PagePath('noop'),
        public PageStatus $status = PageStatus::unpublished,
        public EntryType $type = EntryType::entry,
        public PageData $data = new PageData(''),
        public PageJson $json = new PageJson('{}'),
        public DateTimeImmutable|null $datePublished = null,
        public bool $useShortHero = true,
        public bool $useCustomHero = false,
        public int $heroDarkeningOverlayOpacity = 0,
        public string $heroImage = '',
        public PageJson $heroUpperCta = new PageJson('{}'),
        public string $heroHeading = '',
        public string $heroSubheading = '',
        public string $heroParagraph = '',
    ) {
    }

    /** @return mixed[] */
    public function asScalarArray(
        EntryPropertyCollection $omit = new EntryPropertyCollection(),
    ): array {
        $values = [
            'id' => $this->id->toString(),
            'blogPage' => $this->blogPage->asScalarArray(
                new PagePropertyCollection([
                    PageProperty::children,
                ]),
            ),
            'author' => $this->author?->asScalarArray(),
            'name' => $this->name->value,
            'slug' => $this->slug->value,
            'path' => $this->path->value,
            'status' => $this->status->name,
            'type' => $this->type->name,
            'data' => $this->data->value,
            'json' => $this->json->data,
            'datePublished' => $this->datePublished?->setTimezone(
                new DateTimeZone('US/Central'),
            )->format(DateTimeInterface::ATOM),
            'useShortHero' => $this->useShortHero,
            'useCustomHero' => $this->useCustomHero,
            'heroDarkeningOverlayOpacity' => $this->heroDarkeningOverlayOpacity,
            'heroImage' => $this->heroImage,
            'heroUpperCta' => $this->heroUpperCta->data,
            'heroHeading' => $this->heroHeading,
            'heroSubheading' => $this->heroSubheading,
            'heroParagraph' => $this->heroParagraph,
        ];

        $omit->map(
            static function (
                EntryProperty $property,
            ) use (&$values): void {
                unset($values[$property->name]);
            },
        );

        return $values;
    }
}
