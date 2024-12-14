<?php

declare(strict_types=1);

namespace App\Logging;

use Psr\Log\LoggerInterface;
use Stringable;

readonly class NoOpLogger implements LoggerInterface
{
    /** @inheritDoc */
    public function emergency(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function alert(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function critical(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function error(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function warning(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function notice(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function info(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function debug(Stringable|string $message, array $context = []): void
    {
    }

    /** @inheritDoc */
    public function log($level, Stringable|string $message, array $context = []): void
    {
    }
}
