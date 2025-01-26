<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\Persistence\ApiPdo;
use App\Persistence\Sort;
use PDO;

use function implode;

readonly class FindEntries
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function find(
        int $limit = 0,
        int $offset = 0,
        OrderBy $orderBy = OrderBy::date_published,
        Sort $sort = Sort::DESC,
    ): EntryRecordCollection {
        $columns = implode(', ', EntryRecord::getColumns());

        $sql = [
            'SELECT',
            $columns,
            'FROM',
            EntryRecord::getTableName(),
            'ORDER BY ' . $orderBy->name . ' ' . $sort->name,
        ];

        if ($limit > 0) {
            $sql[] = 'LIMIT ' . $limit;
        }

        if ($offset > 0) {
            $sql[] = 'OFFSET ' . $offset;
        }

        $statement = $this->pdo->prepare(
            implode(' ', $sql),
        );

        $statement->execute();

        return new EntryRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            EntryRecord::class,
        ));
    }
}
