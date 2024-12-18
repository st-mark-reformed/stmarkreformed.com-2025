<?php

declare(strict_types=1);

namespace App\Persistence;

use Exception;

class PersistenceError extends Exception
{
    public function __construct(public readonly Result $result)
    {
        parent::__construct();
    }
}
