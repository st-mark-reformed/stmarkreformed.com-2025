<?php

declare(strict_types=1);

namespace Cli\Commands\Docker\Container;

use Cli\StreamCommand;
use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;
use Symfony\Component\Console\Output\ConsoleOutputInterface;

readonly class ContainerCommand
{
    public static function applyCommand(
        ApplyCliCommandsEvent $commands,
        string $container,
        string $class,
    ): void {
        $commands->addCommand(
            'docker:container:' . $container . ' [input]*',
            $class,
        )
            ->descriptions(
                'Stops the Docker environment',
                ['input' => 'If this argument is provided, instead of dropping you into the container shell, the provided command will be run in the container'],
            );
    }

    public function __construct(
        private StreamCommand $streamCommand,
        private ConsoleOutputInterface $output,
    ) {
    }

    public function run(
        string $container,
        ContainerConfig $config = new ContainerConfig(),
    ): void {
        $this->output->writeln($config->createNotice(
            $container,
        ));

        if (! $config->hasCommand()) {
            $this->output->writeln(
                '<fg=yellow>Remember to exit when you\'re done</>',
            );
        }

        $this->streamCommand->stream(
            $config->compileCommand($container),
        );
    }
}
