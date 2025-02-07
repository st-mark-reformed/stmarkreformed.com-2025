<?php

declare(strict_types=1);

namespace Cli\Events;

use Cli\Commands\Docker\BuildCommand;
use Cli\Commands\Docker\Container\ContainerApiCommand;
use Cli\Commands\Docker\Container\ContainerCmsCommand;
use Cli\Commands\Docker\Container\ContainerWebCommand;
use Cli\Commands\Docker\DownCommand;
use Cli\Commands\Docker\FromScratchCommand;
use Cli\Commands\Docker\RestartCommand;
use Cli\Commands\Docker\UpCommand;
use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;

readonly class ApplyCliCommandsEventSubscriber
{
    public function onDispatch(ApplyCliCommandsEvent $commands): void
    {
        // Docker commands
        BuildCommand::applyCommand($commands);
        DownCommand::applyCommand($commands);
        FromScratchCommand::applyCommand($commands);
        RestartCommand::applyCommand($commands);
        UpCommand::applyCommand($commands);

        // Docker Container Commands
        ContainerApiCommand::applyCommand($commands);
        ContainerCmsCommand::applyCommand($commands);
        ContainerWebCommand::applyCommand($commands);
    }
}
