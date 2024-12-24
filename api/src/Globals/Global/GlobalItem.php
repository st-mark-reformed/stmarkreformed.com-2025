<?php

declare(strict_types=1);

namespace App\Globals\Global;

use App\EmptyUuid;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\UuidInterface;
use RuntimeException;
use Spatie\Cloneable\Cloneable;

use function is_string;
use function json_encode;
use function json_last_error_msg;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification

readonly class GlobalItem
{
    use Cloneable;

    public function __construct(
        public UuidInterface $id = new EmptyUuid(),
        public GlobalName $name = new GlobalName('NoOp'),
        public GlobalSlug $slug = new GlobalSlug('noop'),
        public GlobalJson $json = new GlobalJson('{}'),
    ) {
    }

    /** @return mixed[] */
    public function asScalarArray(): array
    {
        return [
            'id' => $this->id->toString(),
            'name' => $this->name->value,
            'slug' => $this->slug->value,
            'json' => $this->json->data,
        ];
    }

    public function withId(string|UuidInterface $id): GlobalItem
    {
        if (is_string($id)) {
            return $this->with(id: Uuid::fromString($id));
        }

        return $this->with(id: $id);
    }

    public function withName(string $name): GlobalItem
    {
        return $this->with(name: new GlobalName($name));
    }

    public function withSlug(string $slug): GlobalItem
    {
        return $this->with(slug: new GlobalSlug($slug));
    }

    /** @phpstan-ignore-next-line */
    public function withJson(array $json): GlobalItem
    {
        $jsonString = json_encode($json);

        if ($jsonString === false) {
            throw new RuntimeException(json_last_error_msg());
        }

        return $this->with(json: new GlobalJson($jsonString));
    }
}
