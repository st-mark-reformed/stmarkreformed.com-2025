<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use App\Persistence\ApiPdo;
use App\Persistence\Result;
use App\Persistence\UuidCollection;

use function array_fill;
use function implode;

readonly class DeleteProfiles
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function delete(UuidCollection $ids): Result
    {
        if (! $ids->hasIds()) {
            return new Result(true, []);
        }

        $in = implode(
            ',',
            array_fill(
                0,
                $ids->count(),
                '?',
            ),
        );

        $statement = $this->pdo->prepare(implode(' ', [
            'DELETE FROM',
            ProfileRecord::getTableName(),
            'WHERE id IN (' . $in . ')',
        ]));

        if (! $statement->execute($ids->asScalarArray())) {
            return new Result(
                false,
                $this->pdo->errorInfo(),
            );
        }

        return new Result(true, []);
    }
}
