<?php

declare(strict_types=1);

namespace Cli\Commands\Docker;

use Cli\CliQuestion;
use Cli\StreamCommand;
use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;
use Symfony\Component\Console\Output\ConsoleOutputInterface;

use function implode;
use function in_array;
use function mb_strtolower;

readonly class FromScratchCommand
{
    public static function applyCommand(ApplyCliCommandsEvent $commands): void
    {
        $commands->addCommand(
            'docker:from-scratch',
            self::class,
        )->descriptions(
            'Deletes are ephemeral data and rebuilds the Docker environment',
        );
    }

    public function __construct(
        private UpCommand $upCommand,
        private CliQuestion $question,
        private DownCommand $downCommand,
        private StreamCommand $streamCommand,
        private ConsoleOutputInterface $output,
    ) {
    }

    public function __invoke(): void
    {
        $this->run();
    }

    public function run(): void
    {
        $this->output->writeln(
            implode(' ', [
                '<fg=red>WARNING: Deletes all ephemeral data and volumes,',
                'vendor files, and node_modules associated with the docker',
                'environment, and then rebuilds it',
                '</>',
            ]),
        );

        $this->output->writeln(
            '<fg=cyan>(gonna take a hot second)</>',
        );

        $proceed = $this->question->ask('Continue? (y/n) ');

        if (
            ! in_array(
                mb_strtolower($proceed),
                [
                    'y',
                    'yes',
                ],
                true,
            )
        ) {
            $this->output->writeln('<fg=yellow>Aborting…</>');

            return;
        }

        $this->downCommand->run();

        // Remove docker images
        (new BuildCommandConfig())->walkImages(
            function (
                string $name,
                string $tag,
            ): void {
                $this->streamCommand->stream([
                    'docker',
                    'image',
                    'rm',
                    $tag,
                ]);
            },
        );

        // Remove API vendor directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'api/vendor',
        ]);

        // Remove CMS .next directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'cms/.next',
        ]);

        // Remove CMS .pnpm-store directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'cms/.pnpm-store',
        ]);

        // Remove CMS node_modules directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'cms/node_modules',
        ]);

        // Remove WEB .next directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'web/.next',
        ]);

        // Remove WEB .pnpm-store directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'web/.pnpm-store',
        ]);

        // Remove WEB node_modules directory
        $this->streamCommand->stream([
            'rm',
            '-rf',
            'web/node_modules',
        ]);

        $this->upCommand->run();
    }
}
