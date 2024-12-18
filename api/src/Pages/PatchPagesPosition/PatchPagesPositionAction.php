<?php

declare(strict_types=1);

namespace App\Pages\PatchPagesPosition;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Pages\PatchPagesPosition\Persistence\UpdatePagePositions;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;
use Throwable;

use function json_encode;

readonly class PatchPagesPositionAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->patch('/pages/all-pages', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private PageCollectionFactory $collectionFactory,
        private UpdatePagePositions $updatePagePositions,
    ) {
    }

    /** @throws Throwable */
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $pages = $this->collectionFactory->fromRequest($request);

        $result = $this->updatePagePositions->update($pages);

        $response->getBody()->write(
            (string) json_encode($result->asScalarArray()),
        );

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
