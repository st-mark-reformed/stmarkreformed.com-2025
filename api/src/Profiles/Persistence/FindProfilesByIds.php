<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use App\Persistence\ApiPdo;
use App\Persistence\UuidCollection;
use PDO;

use function array_fill;
use function implode;

readonly class FindProfilesByIds
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function find(UuidCollection $ids): ProfileRecordCollection
    {
        if (! $ids->hasIds()) {
            return new ProfileRecordCollection();
        }

        $in = implode(
            ',',
            array_fill(
                0,
                $ids->count(),
                '?',
            ),
        );

        $columns = implode(', ', ProfileRecord::getColumns());

        $statement = $this->pdo->prepare(implode(' ', [
            'SELECT',
            $columns,
            'FROM',
            ProfileRecord::getTableName(),
            'WHERE id IN (' . $in . ')',
            'ORDER BY last_name ASC, first_name ASC',
        ]));

        $statement->execute();

        return new ProfileRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            ProfileRecord::class,
        ));
    }
}
