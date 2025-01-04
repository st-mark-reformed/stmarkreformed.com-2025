<?php

declare(strict_types=1);

namespace Config\Dependencies;

use App\UrlGenerator;
use Config\RuntimeConfig;
use Config\RuntimeConfigOptions;
use RxAnte\AppBootstrap\Dependencies\Bindings;

readonly class RegisterBindingsUrl
{
    public static function register(Bindings $bindings): void
    {
        $runtimeConfig = new RuntimeConfig();

        $bindings->addBinding(
            UrlGenerator::class,
            $bindings->autowire(UrlGenerator::class)
                ->constructorParameter(
                    'baseUrl',
                    $runtimeConfig->getString(
                        RuntimeConfigOptions::URL,
                    ),
                ),
        );
    }
}
