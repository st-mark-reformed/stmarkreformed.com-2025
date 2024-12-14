<?php

declare(strict_types=1);

namespace Config\Dependencies;

use RxAnte\AppBootstrap\Dependencies\Bindings;

class RegisterBindings
{
    public static function register(Bindings $bindings): void
    {
        RegisterBindingsAuthentication::register($bindings);
        RegisterBindingsCache::register($bindings);
        RegisterBindingsClock::register($bindings);
        RegisterBindingsLogging::register($bindings);
        RegisterBindingsUuid::register($bindings);
    }
}
