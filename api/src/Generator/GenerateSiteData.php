<?php

declare(strict_types=1);

namespace App\Generator;

readonly class GenerateSiteData
{
    public const string JOB_HANDLE = 'generate-site-data';

    public const string JOB_NAME = 'Generate Site Data';

    public function __construct(
        private GenerateMenu $generateMenu,
        private GeneratePages $generatePages,
        private GenerateGlobals $generateGlobals,
    ) {
    }

    public function __invoke(): void
    {
        $this->generate();
    }

    public function generate(): void
    {
        $this->generateMenu->generate();
        $this->generatePages->generate();
        $this->generateGlobals->generate();
    }
}
