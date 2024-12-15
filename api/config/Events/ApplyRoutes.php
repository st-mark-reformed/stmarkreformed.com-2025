<?php

declare(strict_types=1);

namespace Config\Events;

use App\Healthcheck;
use App\Pages\GetAllPagesAction;
use App\Pages\PostNewPage\PostNewPageAction;
use RxAnte\AppBootstrap\Http\ApplyRoutesEvent;
use RxAnte\OAuth\Routes\Route as OauthRoute;
use RxAnte\OAuth\Routes\RoutesFactory as OauthRoutesFactory;

use function assert;

readonly class ApplyRoutes
{
    public function onDispatch(ApplyRoutesEvent $routes): void
    {
        Healthcheck::applyRoute($routes);
        GetAllPagesAction::applyRoute($routes);
        PostNewPageAction::applyRoute($routes);

        $this->setUpAuthRoutes($routes);
    }

    private function setUpAuthRoutes(ApplyRoutesEvent $event): void
    {
        $oauthRoutesFactory = $event->getContainer()->get(
            OauthRoutesFactory::class,
        );

        assert($oauthRoutesFactory instanceof OauthRoutesFactory);

        $oauthRoutes = $oauthRoutesFactory->create();

        $oauthRoutes->map(
            static function (OauthRoute $route) use ($event): void {
                $event->map(
                    [$route->requestMethod->name],
                    $route->pattern,
                    $route->class,
                );
            },
        );
    }
}
