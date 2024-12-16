<?php

declare(strict_types=1);

namespace App;

use DateTimeInterface;
use Ramsey\Uuid\Converter\NumberConverterInterface;
use Ramsey\Uuid\Fields\FieldsInterface;
use Ramsey\Uuid\Type\Hexadecimal;
use Ramsey\Uuid\Type\Integer as IntegerObject;
use Ramsey\Uuid\UuidInterface;
use RuntimeException;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingTraversableTypeHintSpecification
// phpcs:disable SlevomatCodingStandard.TypeHints.ReturnTypeHint.MissingTraversableTypeHintSpecification

class EmptyUuid implements UuidInterface
{
    public function serialize(): string|null
    {
        throw new RuntimeException('Not Implemented');
    }

    /** @inheritDoc */
    public function unserialize(string $data)
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getNumberConverter(): NumberConverterInterface
    {
        throw new RuntimeException('Not Implemented');
    }

    /** @inheritDoc */
    public function getFieldsHex(): array
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getClockSeqHiAndReservedHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getClockSeqLowHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getClockSequenceHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getDateTime(): DateTimeInterface
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getLeastSignificantBitsHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getMostSignificantBitsHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getNodeHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getTimeHiAndVersionHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getTimeLowHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getTimeMidHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getTimestampHex(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getVariant(): int|null
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getVersion(): int|null
    {
        throw new RuntimeException('Not Implemented');
    }

    public function compareTo(UuidInterface $other): int
    {
        throw new RuntimeException('Not Implemented');
    }

    public function equals(object|null $other): bool
    {
        return $other instanceof EmptyUuid;
    }

    public function getBytes(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getFields(): FieldsInterface
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getHex(): Hexadecimal
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getInteger(): IntegerObject
    {
        throw new RuntimeException('Not Implemented');
    }

    public function getUrn(): string
    {
        throw new RuntimeException('Not Implemented');
    }

    public function toString(): string
    {
        /** @phpstan-ignore-next-line */
        return '';
    }

    public function __toString(): string
    {
        /** @phpstan-ignore-next-line */
        return '';
    }

    public function jsonSerialize(): mixed
    {
        throw new RuntimeException('Not Implemented');
    }

    public function __serialize(): array
    {
        throw new RuntimeException('Not Implemented');
    }

    /** @phpstan-ignore-next-line */
    public function __unserialize(array $data): void
    {
        throw new RuntimeException('Not Implemented');
    }
}
