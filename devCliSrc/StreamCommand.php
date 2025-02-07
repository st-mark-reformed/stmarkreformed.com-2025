<?php

declare(strict_types=1);

namespace Cli;

use Symfony\Component\Process\Process;

readonly class StreamCommand
{
    public function __construct(private CliSrcPath $cliSrcPath)
    {
    }

    /**
     * @param string[]     $command
     * @param mixed[]|null $env
     */
    public function stream(
        array $command,
        string|null $cwd = null,
        array|null $env = null,
        bool $exitOnError = true,
    ): int {
        if ($cwd === null) {
            $cwd = $this->cliSrcPath->projectRoot();
        }

        $existStatus = (new Process(command: $command, cwd: $cwd, env: $env))
            ->setTty(Process::isTtySupported())
            ->setTimeout(null)
            ->run(static function ($type, $buffer): void {
                echo $buffer;
            });

        if (! $exitOnError || $existStatus === 0) {
            return $existStatus;
        }

        exit($existStatus);
    }
}
