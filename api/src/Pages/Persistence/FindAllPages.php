<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use App\Persistence\ApiPdo;
use PDO;

use function implode;

readonly class FindAllPages
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function find(): PageRecordCollection
    {
        $columns = implode(', ', PageRecord::getColumns());

        $statement = $this->pdo->prepare(
            implode(' ', [
                'SELECT',
                $columns,
                'FROM',
                PageRecord::getTableName(),
                'ORDER BY position ASC',
            ]),
        );

        $statement->execute();

        return new PageRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            PageRecord::class,
        ));
    }
}
