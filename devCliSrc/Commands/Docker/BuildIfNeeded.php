<?php

declare(strict_types=1);

namespace Cli\Commands\Docker;

use Cli\CliSrcPath;

use function file_get_contents;
use function md5_file;
use function shell_exec;
use function trim;

readonly class BuildIfNeeded
{
    public function __construct(
        private CliSrcPath $cliSrcPath,
        private BuildCommand $buildCommand,
    ) {
    }

    public function run(): void
    {
        $buildCommandConfig = (new BuildCommandConfig())->filter(
            function (
                string $name,
                string $tag,
                string $dockerfilePath,
            ): bool {
                $hash = md5_file($this->cliSrcPath->pathFromProjectRoot(
                    $dockerfilePath,
                ));

                $previousHash = trim(file_get_contents(
                    $this->cliSrcPath->dockerfileHashesPath(
                        $name,
                    ),
                ));

                if ($hash !== $previousHash) {
                    return true;
                }

                $tagCheck = trim(shell_exec(
                    'docker images -q ' . $tag,
                ));

                return $tagCheck === '';
            },
        );

        $this->buildCommand->run($buildCommandConfig);
    }
}
