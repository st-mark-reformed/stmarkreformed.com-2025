<?php

declare(strict_types=1);

namespace App\ImageHandling;

use public\uploads\UploadsPath;

enum Directory
{
    case UPLOADS;

    public function absolutePath(): string
    {
        return match ($this) {
            self::UPLOADS => UploadsPath::ABSOLUTE_PATH,
        };
    }

    public function relativePath(): string
    {
        return match ($this) {
            self::UPLOADS => UploadsPath::RELATIVE_PATH,
        };
    }
}
