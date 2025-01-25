<?php

declare(strict_types=1);

namespace App\Persistence;

use PDO;
use Ramsey\Uuid\UuidInterface;

use function assert;
use function implode;

readonly class FindRecordById
{
    public function __construct(private ApiPdo $pdo)
    {
    }

    /** @param class-string<Record> $recordClass */
    public function find(
        UuidInterface $id,
        string $recordClass,
    ): RecordResult {
        $columns = implode(', ', $recordClass::getColumns());

        $statement = $this->pdo->prepare(
            implode(' ', [
                'SELECT',
                $columns,
                'FROM',
                $recordClass::getTableName(),
                'WHERE id = :id',
            ]),
        );

        $statement->execute(['id' => $id->toString()]);

        $statement->setFetchMode(
            PDO::FETCH_CLASS,
            $recordClass,
        );

        $record = $statement->fetch();

        assert($record instanceof Record || $record === false);

        return new RecordResult(
            $record !== false ? $record : null,
            $recordClass,
        );
    }
}
