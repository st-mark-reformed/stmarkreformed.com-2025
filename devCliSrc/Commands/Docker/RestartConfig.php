<?php

declare(strict_types=1);

namespace Cli\Commands\Docker;

readonly class RestartConfig
{
    public function __construct(
        public bool $build = false,
        public bool $runProvision = false,
    ) {
    }
}
