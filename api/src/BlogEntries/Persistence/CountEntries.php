<?php

declare(strict_types=1);

namespace App\BlogEntries\Persistence;

use App\EmptyUuid;
use App\Persistence\ApiPdo;
use App\Persistence\CountResult;
use App\Persistence\SqlCompilation;
use PDO;
use Ramsey\Uuid\UuidInterface;

use function array_key_exists;
use function assert;
use function is_array;

readonly class CountEntries
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    public function count(
        UuidInterface $blogPageId,
        StatusCollection $statuses,
    ): CountResult {
        $sql = new SqlCompilation([
            'SELECT',
            'COUNT(id)',
            'AS',
            'total',
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

        $statement = $this->pdo->prepare($sql->compileSql());

        $statement->execute($sql->compileParams());

        $queryResult = $statement->fetch(PDO::FETCH_ASSOC);

        assert(is_array($queryResult));

        assert(array_key_exists('total', $queryResult));

        return new CountResult((int) $queryResult['total']);
    }
}
