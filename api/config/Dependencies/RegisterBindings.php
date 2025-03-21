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
        RegisterBindingsCli::register($bindings);
        RegisterBindingsClock::register($bindings);
        RegisterBindingsDatabase::register($bindings);
        RegisterBindingsEmail::register($bindings);
        RegisterBindingsLogging::register($bindings);
        RegisterBindingsQueue::register($bindings);
        RegisterBindingsScheduler::register($bindings);
        RegisterBindingsUrl::register($bindings);
        RegisterBindingsUuid::register($bindings);
    }
}
