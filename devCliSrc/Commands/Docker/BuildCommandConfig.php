<?php

declare(strict_types=1);

namespace Cli\Commands\Docker;

use RuntimeException;

use function array_filter;
use function array_map;
use function array_values;
use function in_array;

readonly class BuildCommandConfig
{
    public const array IMAGES = [
        'api',
        'api-queue-consumer',
        'api-schedule-runner',
        'cms',
        'web',
    ];

    public const array IMAGE_TAG_MAP = [
        'api' => 'ghcr.io/st-mark-reformed/smrc-2025-api',
        'api-queue-consumer' => 'ghcr.io/st-mark-reformed/smrc-2025-api-queue-consumer',
        'api-schedule-runner' => 'ghcr.io/st-mark-reformed/smrc-2025-api-schedule-runner',
        'cms' => 'ghcr.io/st-mark-reformed/smrc-2025-cms',
        'web' => 'ghcr.io/st-mark-reformed/smrc-2025-web',
    ];

    public const array IMAGE_DOCKERFILE_PATH_MAP = [
        'api' => 'docker/api/Dockerfile',
        'api-queue-consumer' => 'docker/api-queue-consumer/Dockerfile',
        'api-schedule-runner' => 'docker/api-schedule-runner/Dockerfile',
        'cms' => 'docker/cms/Dockerfile',
        'web' => 'docker/web/Dockerfile',
    ];

    /** @var string[] */
    public array $images;

    /** @param string[]|null $images */
    public function __construct(array|null $images = null)
    {
        if ($images === null) {
            $this->images = self::IMAGES;

            return;
        }

        $this->images = array_values(array_map(
            static function ($image): string {
                if (
                    in_array(
                        $image,
                        self::IMAGES,
                        true,
                    )
                ) {
                    return $image;
                }

                throw new RuntimeException(
                    $image . ' is not a valid image',
                );
            },
            $images,
        ));
    }

    public function filter(callable $callback): BuildCommandConfig
    {
        return new self(array_filter(
            $this->images,
            function (string $name) use ($callback): bool {
                return $callback(
                    $name,
                    $this->imageNameToImageTag($name),
                    $this->imageNameToDockerfilePath($name),
                );
            },
        ));
    }

    public function imageNameToImageTag(string $imageName): string
    {
        return self::IMAGE_TAG_MAP[$imageName];
    }

    public function imageNameToDockerfilePath(string $imageName): string
    {
        return self::IMAGE_DOCKERFILE_PATH_MAP[$imageName];
    }

    public function walkImages(callable $callback): void
    {
        array_map(
            function (string $name) use ($callback): void {
                $callback(
                    $name,
                    $this->imageNameToImageTag($name),
                    $this->imageNameToDockerfilePath($name),
                );
            },
            $this->images,
        );
    }
}
