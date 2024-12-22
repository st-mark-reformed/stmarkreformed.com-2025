<?php

declare(strict_types=1);

namespace App\Globals\Global;

use RuntimeException;

use function json_decode;
use function json_encode;
use function json_validate;

readonly class GlobalJson
{
    /** @var mixed[] */
    public array $data;

    public function __construct(public string $value)
    {
        if (! json_validate($value)) {
            throw new RuntimeException('Invalid json value');
        }

        /** @phpstan-ignore-next-line */
        $this->data = json_decode($this->value, true);
    }

    public function toString(): string
    {
        return (string) json_encode($this->data);
    }
}
