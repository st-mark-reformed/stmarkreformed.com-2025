<?php

declare(strict_types=1);

namespace App\Persistence;

use RuntimeException;
use Spatie\Cloneable\Cloneable;

use function array_key_exists;
use function array_keys;
use function array_map;
use function array_merge;
use function array_values;
use function implode;
use function is_scalar;

readonly class SqlCompilation
{
    use Cloneable;

    /** @var string[] */
    private array $statement;

    /**
     * @param string[]              $statement
     * @param array<string, scalar> $params
     */
    public function __construct(
        array $statement = [],
        private array $params = [],
    ) {
        $this->statement = array_values(array_map(
            static fn (string $s) => $s,
            $statement,
        ));

        array_map(
            static function ($param): void {
                /** @phpstan-ignore-next-line */
                if (is_scalar($param)) {
                    return;
                }

                throw new RuntimeException(
                    '$param must be a scalar value',
                );
            },
            $params,
        );

        array_map(
            static fn (string $key) => true,
            array_keys($params),
        );
    }

    public function compileSql(): string
    {
        return implode(' ', $this->statement);
    }

    /** @return array<string, scalar> */
    public function compileParams(): array
    {
        return $this->params;
    }

    public function withAddToStatement(string $addition): SqlCompilation
    {
        return $this->with(statement: array_values(array_merge(
            $this->statement,
            [$addition],
        )));
    }

    public function withAddToParams(string $key, string $val): SqlCompilation
    {
        if (array_key_exists($key, $this->params)) {
            throw new RuntimeException('Param already exists');
        }

        return $this->with(params: array_merge(
            $this->params,
            [$key => $val],
        ));
    }
}
