<?php

declare(strict_types=1);

namespace Config;

enum RuntimeConfigOptions
{
    case USE_WHOOPS_ERROR_HANDLING;
    case USE_PRODUCTION_ERROR_MIDDLEWARE;

    // Cache
    case REDIS_HOST;

    // Authentication
    case FUSION_AUTH_SSL_VERIFY;
    case FUSION_AUTH_WELL_KNOWN_URL;
    case FUSION_AUTH_CALLBACK_DOMAIN;
    case FUSION_AUTH_CLIENT_ID;
    case FUSION_AUTH_CLIENT_SECRET;
    case FUSION_AUTH_SIGNING_CERTIFICATE;
}
