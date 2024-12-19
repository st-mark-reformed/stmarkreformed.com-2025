<?php

declare(strict_types=1);

namespace App\Pages\GetPage;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Authentication\UserAttributes;
use App\Pages\PageRepository;
use JetBrains\PhpStorm\ArrayShape;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

readonly class GetPageAction
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/pages/{pageId}', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(
        private Responder $responder,
        private PageRepository $repository,
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

        $result = $this->repository->findAllPages()->findOneById($pageId);

        return $this->responder->respond($result);
    }
}
