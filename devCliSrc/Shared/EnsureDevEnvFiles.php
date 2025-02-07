<?php

declare(strict_types=1);

namespace Cli\Shared;

use Cli\CliSrcPath;

use function touch;

readonly class EnsureDevEnvFiles
{
    public function __construct(private CliSrcPath $path)
    {
    }

    public function run(): void
    {
        // API
        touch($this->path->pathFromProjectRoot(
            'docker/api/.bash_history',
        ));
        touch($this->path->pathFromProjectRoot(
            'docker/api/.env.local',
        ));

        // CMS
        touch($this->path->pathFromProjectRoot(
            'docker/cms/.bash_history',
        ));
        touch($this->path->pathFromProjectRoot(
            'docker/cms/.env.local',
        ));

        // FusionAuth
        touch($this->path->pathFromProjectRoot(
            'docker/fusionauth/.env.local',
        ));

        // Web
        touch($this->path->pathFromProjectRoot(
            'docker/web/.bash_history',
        ));
        touch($this->path->pathFromProjectRoot(
            'docker/web/.env.local',
        ));
    }
}
