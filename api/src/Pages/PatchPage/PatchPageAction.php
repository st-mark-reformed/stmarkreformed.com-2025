<?php

declare(strict_types=1);

namespace App\Pages\PatchPage;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\Pages\GetPage\PageIdFactory;
use App\Pages\PageRepository;
use App\Persistence\ResultResponder;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class PatchPageAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->patch('/pages/{pageId}', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private UpdatePage $updatePage,
        private PageRepository $repository,
        private ResultResponder $responder,
        private PageIdFactory $pageIdFactory,
    ) {
    }

    /** @param string[] $attributes */
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        UserAttributes $userAttributes,
        #[ArrayShape(['pageId' => 'string'])]
        array $attributes,
    ): ResponseInterface {
        $pageId = $this->pageIdFactory->fromString($attributes['pageId']);

        $pageResult = $this->repository->findAllPages()->findOneById(
            $pageId,
        );

        $result = $this->updatePage->fromRequest(
            $request,
            $pageResult,
        );

        return $this->responder->respond($result);
    }
}
