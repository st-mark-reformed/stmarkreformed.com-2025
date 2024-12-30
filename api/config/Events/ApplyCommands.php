<?php

declare(strict_types=1);

namespace Config\Events;

use App\Pages\Generator\GenerateSiteDataCommand;
use App\Persistence\Migrate\MigrateCreateCommand;
use App\Persistence\Migrate\MigrateDownCommand;
use App\Persistence\Migrate\MigrateStatusCommand;
use App\Persistence\Migrate\MigrateUpCommand;
use App\Persistence\Seed\SeedCreateCommand;
use App\Persistence\Seed\SeedRunCommand;
use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;

readonly class ApplyCommands
{
    public function onDispatch(ApplyCliCommandsEvent $commands): void
    {
        MigrateUpCommand::register($commands);
        MigrateStatusCommand::register($commands);
        MigrateDownCommand::register($commands);
        MigrateCreateCommand::register($commands);
        SeedCreateCommand::register($commands);
        SeedRunCommand::register($commands);
        GenerateSiteDataCommand::register($commands);
    }
}
