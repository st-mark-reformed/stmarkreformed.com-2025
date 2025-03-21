<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\EmptyUuid;
use App\Persistence\ApiPdo;
use App\Persistence\SqlCompilation;
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
        StatusCollection $statuses,
        OrderBySortCollection $ordering,
    ): EntryRecordCollection {
        $columns = implode(', ', EntryRecord::getColumns());

        $sql = new SqlCompilation([
            'SELECT',
            $columns,
            'FROM',
            EntryRecord::getTableName(),
            'WHERE 1 = 1',
        ]);

        if (! ($blogPageId instanceof EmptyUuid)) {
            $sql = $sql->withAddToStatement(
                'AND blog_page_id = :blog_page_id',
            )->withAddToParams(
                'blog_page_id',
                $blogPageId->toString(),
            );
        }

        $sql = $statuses->compileIntoSql($sql);

        $sql = $ordering->compileIntoSql($sql);

        if ($limit > 0) {
            $sql = $sql->withAddToStatement(
                'LIMIT ' . $limit,
            );
        }

        if ($offset > 0) {
            $sql = $sql->withAddToStatement(
                'OFFSET ' . $offset,
            );
        }

        $statement = $this->pdo->prepare($sql->compileSql());

        $statement->execute($sql->compileParams());

        return new EntryRecordCollection($statement->fetchAll(
            PDO::FETCH_CLASS,
            EntryRecord::class,
        ));
    }
}
