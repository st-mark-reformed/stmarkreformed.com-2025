<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\EmptyUuid;
use App\Persistence\ApiPdo;
use PDO;
use Ramsey\Uuid\UuidInterface;

use function implode;

readonly class FindEntries
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function find(
        UuidInterface $blogPageId,
        int $limit,
        int $offset,
        OrderBySortCollection $ordering,
    ): EntryRecordCollection {
        $columns = implode(', ', EntryRecord::getColumns());

        $sql = [
            'SELECT',
            $columns,
            'FROM',
            EntryRecord::getTableName(),
        ];

        if (! ($blogPageId instanceof EmptyUuid)) {
            $sql[] = 'WHERE blog_page_id = :blog_page_id';
        }

        $sql = $ordering->compileIntoSqlArray($sql);

        if ($limit > 0) {
            $sql[] = 'LIMIT ' . $limit;
        }

        if ($offset > 0) {
            $sql[] = 'OFFSET ' . $offset;
        }

        $statement = $this->pdo->prepare(
            implode(' ', $sql),
        );

        $statement->execute(
            ['blog_page_id' => $blogPageId->toString()],
        );

        return new EntryRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            EntryRecord::class,
        ));
    }
}
