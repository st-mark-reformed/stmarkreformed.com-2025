<?php

declare(strict_types=1);

namespace App\Generator;

use App\Globals\Global\GlobalItem;
use App\Globals\GlobalRepository;
use Redis;

use function array_filter;
use function array_map;
use function count;
use function in_array;
use function json_encode;
use function mb_strlen;
use function mb_substr;

class GenerateGlobals
{
    /** @var string[] */
    private array $paths = [];

    public function __construct(
        private readonly Redis $redis,
        private readonly GlobalRepository $globalRepository,
    ) {
    }

    public function __invoke(): void
    {
        $this->generate();
    }

    public function generate(): void
    {
        $globals = $this->globalRepository->findAllGlobals();

        $globals->walkAll(
            fn (GlobalItem $g) => $this->handle($g),
        );

        $this->cleanUnused();
    }

    private function handle(GlobalItem $global): void
    {
        $this->paths[] = $global->slug->value;

        $this->redis->set(
            'static_global_data:' . $global->slug->value,
            json_encode($global->asScalarArray()),
        );
    }

    private function cleanUnused(): void
    {
        $keyPrefix = 'static_global_data:';

        $redisKeys = $this->redis->keys($keyPrefix . '*');

        $existingKeys = array_map(
            static fn (string $key) => mb_substr(
                $key,
                mb_strlen($keyPrefix),
            ),
            $redisKeys,
        );

        $removeKeys = array_filter(
            $existingKeys,
            fn (string $key) => ! in_array(
                $key,
                $this->paths,
                true,
            ),
        );

        if (count($removeKeys) < 1) {
            return;
        }

        array_map(
            function (string $key) use ($keyPrefix): void {
                $this->redis->del($keyPrefix . $key);
            },
            $removeKeys,
        );
    }
}
