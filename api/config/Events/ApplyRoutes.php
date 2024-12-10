<?php

declare(strict_types=1);

namespace Config\Events;

use App\Healthcheck;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;

readonly class ApplyRoutes
{
    public function onDispatch(ApplyRoutesEvent $routes): void
    {
        Healthcheck::applyRoute($routes);
    }
}
