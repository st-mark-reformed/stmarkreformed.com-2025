<?php

declare(strict_types=1);

namespace App\Pages\Generator;

use RxAnte\AppBootstrap\Cli\ApplyCliCommandsEvent;

readonly class GenerateSiteDataCommand
{
    public static function register(ApplyCliCommandsEvent $commands): void
    {
        $commands->addCommand('generate:site-data', self::class);
    }

    public function __construct(private GenerateSiteData $generateSiteData)
    {
    }

    public function __invoke(): int
    {
        $this->generateSiteData->generate();

        return 0;
    }
}
