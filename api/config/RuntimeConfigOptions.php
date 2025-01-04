<?php

declare(strict_types=1);

namespace Config;

enum RuntimeConfigOptions
{
    case USE_WHOOPS_ERROR_HANDLING;
    case USE_PRODUCTION_ERROR_MIDDLEWARE;

    // URL
    case URL;

    // Cache
    case REDIS_HOST;

    // Authentication
    case FUSION_AUTH_SSL_VERIFY;
    case FUSION_AUTH_WELL_KNOWN_URL;
    case FUSION_AUTH_CALLBACK_DOMAIN;
    case FUSION_AUTH_CLIENT_ID;
    case FUSION_AUTH_CLIENT_SECRET;
    case FUSION_AUTH_SIGNING_CERTIFICATE;

    // API Database
    case API_DB_HOST;
    case API_DB_NAME;
    case API_DB_USER;
    case API_DB_PASSWORD;
    case API_DB_PORT;

    // Email
    case SMTP_USER;
    case SMTP_PASSWORD;
    case SMTP_HOST;
    case SMTP_PORT;
    case SYSTEM_EMAIL_FROM_ADDRESS;
    case SYSTEM_EMAIL_FROM_NAME;
}
