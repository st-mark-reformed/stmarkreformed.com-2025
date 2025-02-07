<?php

declare(strict_types=1);

namespace Cli\Commands\Docker;

use Cli\CliSrcPath;
use Cli\StreamCommand;
use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;
use Symfony\Component\Console\Output\ConsoleOutputInterface;

use function count;
use function file_put_contents;
use function implode;
use function is_dir;
use function md5_file;
use function mkdir;

readonly class BuildCommand
{
    public static function applyCommand(ApplyCliCommandsEvent $commands): void
    {
        $commands->addCommand(
            'docker:build [-i|--image=]*',
            self::class,
        )->descriptions(
            'Builds Docker images',
            [
                '--image' => 'Specify which image(s) to build (' . implode('|', BuildCommandConfig::IMAGES) . ')',
            ],
        );
    }

    public function __construct(
        private CliSrcPath $cliSrcPath,
        private StreamCommand $streamCommand,
        private ConsoleOutputInterface $output,
    ) {
    }

    /** @param string[] $image */
    public function __invoke(array $image): void
    {
        $this->run(new BuildCommandConfig(
            count($image) < 1 ? null : $image,
        ));
    }

    public function run(
        BuildCommandConfig $config = new BuildCommandConfig(),
    ): void {
        $config->walkImages(function (
            string $name,
            string $tag,
            string $dockerfilePath,
        ): void {
            $this->output->writeln(
                '<fg=cyan>Building Docker image: ' . $name . ' </>',
            );

            $this->streamCommand->stream([
                'docker',
                'build',
                '--build-arg',
                'BUILDKIT_INLINE_CACHE=1',
                '--cache-from',
                $tag,
                '--file',
                $dockerfilePath,
                '--tag',
                $tag,
                '.',
            ]);

            $this->writeFileHash(
                $name,
                $dockerfilePath,
            );

            $this->output->writeln(
                '<fg=green>Finished building image: ' . $name . ' </>',
            );
        });
    }

    private function writeFileHash(string $name, string $dockerfilePath): void
    {
        $hash = md5_file($this->cliSrcPath->pathFromProjectRoot(
            $dockerfilePath,
        ));

        if (! is_dir($this->cliSrcPath->dockerfileHashesPath())) {
            mkdir(
                $this->cliSrcPath->dockerfileHashesPath(),
                0777,
                true,
            );
        }

        file_put_contents(
            $this->cliSrcPath->dockerfileHashesPath($name),
            $hash,
        );
    }
}
