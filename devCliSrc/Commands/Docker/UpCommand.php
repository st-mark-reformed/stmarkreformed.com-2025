<?php

declare(strict_types=1);

namespace Cli\Commands\Docker;

use Cli\CliSrcPath;
use Cli\Shared\EnsureDevEnvFiles;
use Cli\StreamCommand;
use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;
use Symfony\Component\Console\Output\ConsoleOutputInterface;

use function implode;

readonly class UpCommand
{
    public static function applyCommand(ApplyCliCommandsEvent $commands): void
    {
        $commands->addCommand(
            implode(' ', [
                'docker:up',
                '[-b|--build]',
                '[-i|--in-place]',
                '[-s|--skip-provision]',
            ]),
            self::class,
        )->descriptions(
            'Brings Docker environment online and runs provisioning as necessary',
            [
                '--build' => 'Forces a build of the Docker images before running "up"',
                '--in-place' => 'Run docker up without the detach flag',
                '--skip-provision' => 'Skips provisioning scripts',
            ],
        );
    }

    public function __construct(
        private CliSrcPath $cliSrcPath,
        private BuildCommand $buildCommand,
        private BuildIfNeeded $buildIfNeeded,
        private StreamCommand $streamCommand,
        private ConsoleOutputInterface $output,
        private UpPreUpProvision $upPreUpProvision,
        private EnsureDevEnvFiles $ensureDevEnvFiles,
    ) {
    }

    public function __invoke(
        bool $build = false,
        bool $inPlace = false,
        bool $skipProvision = false,
    ): void {
        $this->run(new UpConfig(
            build: $build,
            inPlace: $inPlace,
            skipProvision: $skipProvision,
        ));
    }

    public function run(UpConfig $config = new UpConfig()): void
    {
        $this->ensureDevEnvFiles->run();

        if ($config->build) {
            $this->buildCommand->run();
        } else {
            $this->buildIfNeeded->run();
        }

        if (! $config->skipProvision) {
            $this->upPreUpProvision->run();
        }

        $this->output->writeln(
            '<fg=cyan>Bringing the Docker environment online…</>',
        );

        $cmd = [
            'docker',
            'compose',
            '--env-file',
            'fusionauth/.env.dev',
            '-f',
            'docker-compose.dev.yml',
            '-p',
            'smrc',
            'up',
        ];

        if ($config->inPlace) {
            $this->streamCommand->stream(
                $cmd,
                $this->cliSrcPath->dockerPath(),
            );

            return;
        }

        $cmd[] = '-d';

        $this->streamCommand->stream(
            $cmd,
            $this->cliSrcPath->dockerPath(),
        );

        $this->output->writeln(
            '<fg=green>Docker environment is online.</>',
        );
    }
}
