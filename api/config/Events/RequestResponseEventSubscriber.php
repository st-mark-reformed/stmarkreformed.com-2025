<?php

declare(strict_types=1);

namespace Config\Events;

use App\Authentication\UserAttributes;
use RxAnte\AppBootstrap\Http\RequestResponseEvent;
use RxAnte\OAuth\UserInfo\OauthUserInfo;

use function array_merge;

readonly class RequestResponseEventSubscriber
{
    public function onDispatch(RequestResponseEvent $event): void
    {
        $userInfo = $event->request->getAttribute('oauthUserInfo');

        if (! ($userInfo instanceof OauthUserInfo)) {
            $userInfo = new OauthUserInfo();
        }

        $event->callableArguments = array_merge(
            [new UserAttributes(userInfo: $userInfo)],
            $event->callableArguments,
        );
    }
}
