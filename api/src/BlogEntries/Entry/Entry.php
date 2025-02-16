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
use RuntimeException;
use Spatie\Cloneable\Cloneable;

use function json_encode;
use function json_last_error_msg;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification

readonly class Entry
{
    use Cloneable;

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

    public function withAuthor(Profile|null $author): Entry
    {
        return $this->with(author: $author);
    }

    public function withName(string $name): Entry
    {
        return $this->with(name: new PageName($name));
    }

    public function withSlug(string $slug): Entry
    {
        return $this->with(slug: new PageSlug($slug));
    }

    public function withPath(string $path): Entry
    {
        return $this->with(path: new PagePath($path));
    }

    public function withStatus(string $status): Entry
    {
        return $this->with(status: PageStatus::fromString($status));
    }

    public function withType(string $type): Entry
    {
        return $this->with(type: EntryType::fromString($type));
    }

    public function withData(string $data): Entry
    {
        return $this->with(data: new PageData($data));
    }

    /** @phpstan-ignore-next-line */
    public function withJson(array $json): Entry
    {
        $jsonString = json_encode($json);

        if ($jsonString === false) {
            throw new RuntimeException(json_last_error_msg());
        }

        return $this->with(json: new PageJson($jsonString));
    }

    public function withJsonObject(PageJson $json): Entry
    {
        return $this->with(json: $json);
    }

    public function withDatePublished(
        DateTimeImmutable|null $datePublished,
    ): Entry {
        return $this->with(datePublished: $datePublished);
    }

    public function withUseShortHero(bool $useShortHero): Entry
    {
        return $this->with(useShortHero: $useShortHero);
    }

    public function withUseCustomHero(bool $useCustomHero): Entry
    {
        return $this->with(useCustomHero: $useCustomHero);
    }

    public function withHeroDarkeningOverlayOpacity(
        int $heroDarkeningOverlayOpacity,
    ): Entry {
        return $this->with(
            heroDarkeningOverlayOpacity: $heroDarkeningOverlayOpacity,
        );
    }

    public function withHeroImage(mixed $heroImage): Entry
    {
        return $this->with(heroImage: $heroImage);
    }

    /** @phpstan-ignore-next-line */
    public function withHeroUpperCta(array $json): Entry
    {
        $jsonString = json_encode($json);

        if ($jsonString === false) {
            throw new RuntimeException(json_last_error_msg());
        }

        return $this->with(heroUpperCta: new PageJson($jsonString));
    }

    public function withHeroHeading(mixed $heroHeading): Entry
    {
        return $this->with(heroHeading: $heroHeading);
    }

    public function withHeroSubHeading(mixed $heroSubheading): Entry
    {
        return $this->with(heroSubheading: $heroSubheading);
    }

    public function withHeroParagraph(mixed $heroParagraph): Entry
    {
        return $this->with(heroParagraph: $heroParagraph);
    }
}
