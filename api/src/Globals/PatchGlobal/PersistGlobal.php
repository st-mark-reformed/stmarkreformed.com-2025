<?php

declare(strict_types=1);

namespace App\Globals\PatchGlobal;

use App\EmptyUuid;
use App\Globals\Global\GlobalItem;
use App\Globals\GlobalRepository;
use App\Persistence\Result;

readonly class PersistGlobal
{
    public function __construct(private GlobalRepository $repository)
    {
    }

    public function persist(GlobalItem $global): Result
    {
        if ($global->id->equals(new EmptyUuid())) {
            return $this->repository->persistNew($global);
        }

        return $this->repository->persist($global);
    }
}
