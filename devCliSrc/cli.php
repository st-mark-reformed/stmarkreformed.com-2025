<?php

declare(strict_types=1);

use Cli\Dependencies\RegisterBindings;
use Cli\Events\EventSubscribers;
use RxAnte\AppBootstrap\Boot;
use RxAnte\AppBootstrap\BootConfig;

require __DIR__ . '/vendor/autoload.php';

(new Boot())
    ->start(new BootConfig(isCli: true))
    ->buildContainer([RegisterBindings::class, 'register'])
    ->registerEventSubscribers([EventSubscribers::class, 'register'])
    ->buildCliApplication()
    ->applyCommands()
    ->runApplication();
