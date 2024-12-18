<?php

declare(strict_types=1);

namespace App\Pages\PatchPagesPosition\Persistence;

use App\Pages\PatchPagesPosition\Page;
use App\Pages\PatchPagesPosition\PageCollection;
use App\Pages\Persistence\CalculateAndUpdatePaths;
use App\Pages\Persistence\PagesTable;
use App\Persistence\ApiPdo;
use App\Persistence\PersistenceError;
use App\Persistence\Result;
use Throwable;

use function implode;

readonly class UpdatePagePositions
{
    public function __construct(
        private ApiPdo $pdo,
        private CalculateAndUpdatePaths $calculateAndUpdatePaths,
    ) {
    }

    /** @throws Throwable */
    public function update(PageCollection $pages): Result
    {
        // path needs to be rebuilt
        try {
            $this->pdo->beginTransaction();

            $pages->walk(function (Page $page): void {
                $statement = $this->pdo->prepare(
                    implode(' ', [
                        'UPDATE',
                        PagesTable::TABLE_NAME,
                        'SET',
                        'parent_id = :parent_id,',
                        'position = :position',
                        'WHERE id = :id',
                    ]),
                );

                if (
                    ! $statement->execute([
                        'parent_id' => $page->parentId->toString(),
                        'position' => $page->position,
                        'id' => $page->id->toString(),
                    ])
                ) {
                    throw new PersistenceError(new Result(
                        false,
                        [$this->pdo->errorCode()],
                    ));
                }
            });

            $this->pdo->commit();

            return $this->calculateAndUpdatePaths->update();
        } catch (PersistenceError $e) {
            $this->pdo->rollBack();

            return $e->result;
        } catch (Throwable $e) {
            $this->pdo->rollBack();

            throw $e;
        }
    }
}
