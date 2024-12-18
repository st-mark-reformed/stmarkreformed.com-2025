<?php

declare(strict_types=1);

namespace App\Pages\Persistence;

use App\EmptyUuid;
use App\Pages\Page\Page;
use App\Pages\PageRepository;
use App\Persistence\ApiPdo;
use App\Persistence\PersistenceError;
use App\Persistence\Result;
use PDO;

use function assert;
use function explode;
use function implode;

readonly class CalculateAndUpdatePaths
{
    public function __construct(
        private ApiPdo $pdo,
        private PageRepository $repository,
    ) {
    }

    public function update(): Result
    {
        try {
            $pages = $this->repository->findAllPages();

            $pages->walkAll(function (Page $page): void {
                $path = [];

                if (! $page->parentId->equals(new EmptyUuid())) {
                    $parentStatement = $this->pdo->prepare(
                        implode(' ', [
                            'SELECT path FROM',
                            PagesTable::TABLE_NAME,
                            'WHERE id = :id',
                        ]),
                    );

                    $parentStatement->execute(
                        ['id' => $page->parentId->toString()],
                    );

                    $parentStatement->setFetchMode(
                        PDO::FETCH_CLASS,
                        PageRecord::class,
                    );

                    $parentRecord = $parentStatement->fetch();

                    assert($parentRecord instanceof PageRecord);

                    $path = explode('/', $parentRecord->path);
                }

                $path[] = $page->slug->value;

                $statement = $this->pdo->prepare(
                    implode(' ', [
                        'UPDATE',
                        PagesTable::TABLE_NAME,
                        'SET',
                        'path = :path',
                        'WHERE id = :id',
                    ]),
                );

                if (
                    ! $statement->execute([
                        'path' => implode('/', $path),
                        'id' => $page->id->toString(),
                    ])
                ) {
                    throw new PersistenceError(new Result(
                        false,
                        [$this->pdo->errorCode()],
                    ));
                }
            });

            return new Result(
                true,
                [],
            );
        } catch (PersistenceError $e) {
            return $e->result;
        }
    }
}
