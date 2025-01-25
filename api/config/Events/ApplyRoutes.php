<?php

declare(strict_types=1);

namespace Config\Events;

use App\Calendar\GetCalendarSelectOptions;
use App\ContactForm\PostContactForm;
use App\Globals\GetAllGlobalsAction;
use App\Globals\PatchGlobal\PatchGlobalAction;
use App\Healthcheck;
use App\Pages\DeletePagesAction;
use App\Pages\GetAllPagesAction;
use App\Pages\GetBlogEntryPages;
use App\Pages\GetBlogPage\GetBlogEntriesPageAction;
use App\Pages\GetPage\GetPageAction;
use App\Pages\GetPageTypesAction;
use App\Pages\GetPhotoGalleryEntryPages;
use App\Pages\GetPodcastEntryPages;
use App\Pages\GetPublicationsEntryPages;
use App\Pages\OverlappingUrisReport\GetOverlappingUriReportAction;
use App\Pages\PatchPage\PatchPageAction;
use App\Pages\PatchPagesPosition\PatchPagesPositionAction;
use App\Pages\PostNewPage\PostNewPageAction;
use App\Profiles\DeleteProfilesAction;
use App\Profiles\GetAllProfilesAction;
use App\Profiles\GetProfile\GetProfileAction;
use App\Profiles\PatchProfile\PatchProfileAction;
use App\Profiles\PostNewProfile\PostNewProfileAction;
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
        GetBlogEntryPages::applyRoute($routes);
        GetBlogEntriesPageAction::applyRoute($routes);
        GetPodcastEntryPages::applyRoute($routes);
        GetPhotoGalleryEntryPages::applyRoute($routes);
        GetPublicationsEntryPages::applyRoute($routes);
        PostNewPageAction::applyRoute($routes);
        PatchPagesPositionAction::applyRoute($routes);
        GetOverlappingUriReportAction::applyRoute($routes);
        DeletePagesAction::applyRoute($routes);
        GetPageTypesAction::applyRoute($routes);
        GetPageAction::applyRoute($routes);
        PatchPageAction::applyRoute($routes);
        GetAllGlobalsAction::applyRoute($routes);
        PatchGlobalAction::applyRoute($routes);
        PostContactForm::applyRoute($routes);
        GetCalendarSelectOptions::applyRoute($routes);
        GetAllProfilesAction::applyRoute($routes);
        PostNewProfileAction::applyRoute($routes);
        GetProfileAction::applyRoute($routes);
        PatchProfileAction::applyRoute($routes);
        DeleteProfilesAction::applyRoute($routes);

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
