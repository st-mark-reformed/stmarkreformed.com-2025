<?php

declare(strict_types=1);

namespace App\Profiles\GetProfile;

use App\Profiles\ProfileResult;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

readonly class Responder
{
    public function __construct(
        private ResponseFactoryInterface $responseFactory,
    ) {
    }

    public function respond(ProfileResult $result): ResponseInterface
    {
        $response = $this->responseFactory->createResponse(
            $result->hasProfile ? 200 : 404,
        )->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $result->hasProfile ?
                $result->profile->asScalarArray() :
                [],
        ));

        return $response;
    }
}
