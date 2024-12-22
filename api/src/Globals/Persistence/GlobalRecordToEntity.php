<?php

declare(strict_types=1);

namespace App\Globals\Persistence;

use App\Globals\Global\GlobalCollection;
use App\Globals\Global\GlobalItem;
use App\Globals\Global\GlobalJson;
use App\Globals\Global\GlobalName;
use App\Globals\Global\GlobalSlug;
use Ramsey\Uuid\Uuid;

readonly class GlobalRecordToEntity
{
    public function transformCollection(
        GlobalRecordCollection $collection,
    ): GlobalCollection {
        /** @phpstan-ignore-next-line */
        return new GlobalCollection($collection->map(
            fn (GlobalRecord $r) => $this->transformRecord($r),
        ));
    }

    public function transformRecord(GlobalRecord $record): GlobalItem
    {
        return new GlobalItem(
            Uuid::fromString($record->id),
            new GlobalName($record->name),
            new GlobalSlug($record->slug),
            new GlobalJson($record->json),
        );
    }
}
