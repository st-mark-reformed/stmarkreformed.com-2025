<?php

declare(strict_types=1);

namespace App\Pages\Page;

use App\EmptyUuid;
use Ramsey\Uuid\UuidInterface;
use RuntimeException;
use Spatie\Cloneable\Cloneable;

use function json_encode;
use function json_last_error_msg;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification

readonly class Page
{
    use Cloneable;

    public function __construct(
        public UuidInterface $id = new EmptyUuid(),
        public UuidInterface $parentId = new EmptyUuid(),
        public PageName $name = new PageName('NoOp'),
        public PageSlug $slug = new PageSlug('noop'),
        public PagePath $path = new PagePath('noop'),
        public PageStatus $status = PageStatus::unpublished,
        public PageType $type = PageType::page,
        public PageData $data = new PageData(''),
        public PageJson $json = new PageJson('{}'),
        public int $position = 0,
        public bool $showInMenu = true,
        public bool $showSubPageSidebar = true,
        public bool $useShortHero = true,
        public bool $useCustomHero = true,
        public int $heroDarkeningOverlayOpacity = 0,
        public string $heroImage = '',
        public PageJson $heroUpperCta = new PageJson('{}'),
        public string $heroHeading = '',
        public string $heroSubheading = '',
        public string $heroParagraph = '',
        public PageCollection $children = new PageCollection(),
    ) {
    }

    /** @return mixed[] */
    public function asScalarArray(
        PagePropertyCollection $omit = new PagePropertyCollection(),
    ): array {
        $values = [
            'id' => $this->id->toString(),
            'parentId' => $this->parentId->toString(),
            'name' => $this->name->value,
            'slug' => $this->slug->value,
            'path' => $this->path->value,
            'status' => $this->status->name,
            'type' => $this->type->name,
            'data' => $this->data->value,
            'json' => $this->json->data,
            'position' => $this->position,
            'showInMenu' => $this->showInMenu,
            'showSubPageSidebar' => $this->showSubPageSidebar,
            'useShortHero' => $this->useShortHero,
            'useCustomHero' => $this->useCustomHero,
            'heroDarkeningOverlayOpacity' => $this->heroDarkeningOverlayOpacity,
            'heroImage' => $this->heroImage,
            'heroUpperCta' => $this->heroUpperCta->data,
            'heroHeading' => $this->heroHeading,
            'heroSubheading' => $this->heroSubheading,
            'heroParagraph' => $this->heroParagraph,
            'children' => $this->children->asScalarArray($omit),
        ];

        $omit->map(
            static function (
                PageProperty $property,
            ) use (&$values): void {
                unset($values[$property->name]);
            },
        );

        return $values;
    }

    public function withName(string $name): Page
    {
        return $this->with(name: new PageName($name));
    }

    public function withSlug(string $slug): Page
    {
        return $this->with(slug: new PageSlug($slug));
    }

    public function withPath(string $path): Page
    {
        return $this->with(path: new PagePath($path));
    }

    public function withStatus(string $status): Page
    {
        return $this->with(status: PageStatus::fromString($status));
    }

    public function withType(string $type): Page
    {
        return $this->with(type: PageType::fromString($type));
    }

    public function withData(string $data): Page
    {
        return $this->with(data: new PageData($data));
    }

    /** @phpstan-ignore-next-line */
    public function withJson(array $json): Page
    {
        $jsonString = json_encode($json);

        if ($jsonString === false) {
            throw new RuntimeException(json_last_error_msg());
        }

        return $this->with(json: new PageJson($jsonString));
    }

    public function withJsonObject(PageJson $json): Page
    {
        return $this->with(json: $json);
    }

    public function withShowInMenu(bool $showInMenu): Page
    {
        return $this->with(showInMenu: $showInMenu);
    }

    public function withShowSubPageSidebar(bool $showSubPageSidebar): Page
    {
        return $this->with(showSubPageSidebar: $showSubPageSidebar);
    }

    public function withUseShortHero(bool $useShortHero): Page
    {
        return $this->with(useShortHero: $useShortHero);
    }

    public function withUseCustomHero(bool $useCustomHero): Page
    {
        return $this->with(useCustomHero: $useCustomHero);
    }

    public function withHeroDarkeningOverlayOpacity(
        int $heroDarkeningOverlayOpacity,
    ): Page {
        return $this->with(
            heroDarkeningOverlayOpacity: $heroDarkeningOverlayOpacity,
        );
    }

    public function withHeroImage(mixed $heroImage): Page
    {
        return $this->with(heroImage: $heroImage);
    }

    /** @phpstan-ignore-next-line */
    public function withHeroUpperCta(array $json): Page
    {
        $jsonString = json_encode($json);

        if ($jsonString === false) {
            throw new RuntimeException(json_last_error_msg());
        }

        return $this->with(heroUpperCta: new PageJson($jsonString));
    }

    public function withHeroHeading(mixed $heroHeading): Page
    {
        return $this->with(heroHeading: $heroHeading);
    }

    public function withHeroSubHeading(mixed $heroSubheading): Page
    {
        return $this->with(heroSubheading: $heroSubheading);
    }

    public function withHeroParagraph(mixed $heroParagraph): Page
    {
        return $this->with(heroParagraph: $heroParagraph);
    }

    /** @param Page[] $children */
    public function withChildren(array $children): Page
    {
        return $this->with(children: new PageCollection($children));
    }
}
