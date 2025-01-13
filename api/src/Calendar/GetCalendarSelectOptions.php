<?php

declare(strict_types=1);

namespace App\Calendar;

use App\Authentication\RequireCmsAccessRoleMiddleware;
use App\Pages\Page\Page;
use App\Pages\Page\PageType;
use App\Pages\PageRepository;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\RequireOauthTokenHeaderMiddleware;

use function json_encode;

readonly class GetCalendarSelectOptions
{
    public static function applyRoute(ApplyRoutesEvent $routes): void
    {
        $routes->get('/calendar/select-options', self::class)
            ->add(RequireCmsAccessRoleMiddleware::class)
            ->add(RequireOauthTokenHeaderMiddleware::class);
    }

    public function __construct(private PageRepository $repository)
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $options = [
            [
                'label' => 'Select calendar page…',
                'value' => '',
            ],
        ];

        $this->repository->findAllPages()->walkAll(
            static function (Page $page) use (&$options): void {
                if ($page->type !== PageType::calendar) {
                    return;
                }

                $options[] = [
                    'label' => $page->name->value . ' (/' . $page->path->value . ')',
                    'value' => $page->path->value,
                ];
            },
        );

        $response->getBody()->write((string) json_encode($options));

        return $response->withHeader(
            'Content-type',
            'application/json',
        );
    }
}
