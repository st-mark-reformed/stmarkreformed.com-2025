<?php

declare(strict_types=1);

namespace Cli\Commands\Docker\Container;

use function array_filter;
use function array_values;
use function explode;
use function implode;
use function trim;

readonly class ContainerConfig
{
    public string $command;

    public function __construct(string $input = '')
    {
        $command = array_values(
            array_filter(
                explode(
                    ' ',
                    $input,
                ),
                static function (string $part): bool {
                    $part = trim($part);

                    return $part !== '';
                },
            ),
        );

        $this->command = implode(' ', $command);
    }

    public function hasCommand(): bool
    {
        return $this->command !== '';
    }

    public function createNotice(string $containerName): string
    {
        return implode(' ', [
            '<fg=yellow>You\'re working inside the \'' . $containerName . '\'',
            'container for this project.</>',
        ]);
    }

    /** @return string[] */
    public function compileCommand(string $container): array
    {
        $command = [
            'docker',
            'exec',
            '-it',
            'smrc_' . $container,
            'bash',
        ];

        if (! $this->hasCommand()) {
            return $command;
        }

        $command[] = '-c';

        $command[] = $this->command;

        return $command;
    }
}
