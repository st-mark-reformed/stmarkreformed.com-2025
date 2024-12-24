<?php

declare(strict_types=1);

namespace App\Globals\PatchGlobal;

use App\EmptyUuid;
use App\Globals\Global\GlobalItem;
use App\Globals\Global\GlobalJson;
use App\Globals\Global\GlobalName;
use App\Globals\Global\GlobalSlug;
use Psr\Http\Message\ServerRequestInterface;
use Ramsey\Uuid\Uuid;
use Throwable;

use function is_array;
use function json_encode;

readonly class GlobalFactory
{
    public function createFromServerRequest(
        ServerRequestInterface $request,
    ): GlobalItem {
        $rawData = $request->getParsedBody();
        $rawData = is_array($rawData) ? $rawData : [];

        try {
            $id = Uuid::fromString($rawData['id'] ?? '');
        } catch (Throwable) {
            $id = new EmptyUuid();
        }

        try {
            $name = new GlobalName($rawData['name'] ?? '');
        } catch (Throwable) {
            $name = new GlobalName('');
        }

        try {
            $slug = new GlobalSlug($rawData['slug'] ?? '');
        } catch (Throwable) {
            $slug = new GlobalSlug('');
        }

        try {
            $json = new GlobalJson(
                /** @phpstan-ignore-next-line */
                json_encode($rawData['json'] ?? []),
            );
        } catch (Throwable) {
            $json = new GlobalJson('{}');
        }

        return new GlobalItem(
            id: $id,
            name: $name,
            slug: $slug,
            json: $json,
        );
    }
}
