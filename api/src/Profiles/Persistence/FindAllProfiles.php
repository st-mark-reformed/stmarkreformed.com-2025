<?php

declare(strict_types=1);

namespace App\Profiles\Persistence;

use App\Persistence\ApiPdo;
use PDO;

use function implode;

readonly class FindAllProfiles
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function find(): ProfileRecordCollection
    {
        $columns = implode(', ', ProfileRecord::getColumns());

        $statement = $this->pdo->prepare(
            implode(' ', [
                'SELECT',
                $columns,
                'FROM',
                ProfileRecord::getTableName(),
                'ORDER BY last_name ASC, first_name ASC',
            ]),
        );

        $statement->execute();

        return new ProfileRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            ProfileRecord::class,
        ));
    }
}
