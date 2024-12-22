<?php

declare(strict_types=1);

namespace App\Globals\Persistence;

use App\Persistence\ApiPdo;
use PDO;

use function implode;

readonly class FindAllGlobals
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function find(): GlobalRecordCollection
    {
        $columns = implode(', ', GlobalRecord::getColumns());

        $statement = $this->pdo->prepare(
            implode(' ', [
                'SELECT',
                $columns,
                'FROM',
                GlobalRecord::getTableName(),
            ]),
        );

        $statement->execute();

        return new GlobalRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            GlobalRecord::class,
        ));
    }
}
