<?php

declare(strict_types=1);

namespace App\Authentication;

use RxAnte\OAuth\UserInfo\OauthUserInfo;

readonly class UserAttributes
{
    public function __construct(public OauthUserInfo $userInfo)
    {
    }
}
