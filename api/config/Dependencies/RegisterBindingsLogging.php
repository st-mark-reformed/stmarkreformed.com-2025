<?php

declare(strict_types=1);

namespace Config\Dependencies;

use App\Logging\NoOpLogger;
use Psr\Log\LoggerInterface;
use RxAnte\AppBootstrap\Dependencies\Bindings;

readonly class RegisterBindingsLogging
{
    public static function register(Bindings $bindings): void
    {
        $bindings->addBinding(
            LoggerInterface::class,
            $bindings->resolveFromContainer(NoOpLogger::class),
        );
    }
}
