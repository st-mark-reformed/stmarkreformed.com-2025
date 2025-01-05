import fs from 'fs';

/**
 * These must be defined as environment variables or docker secrets
 */
export enum ConfigOptions {
    DEV_MODE = 'DEV_MODE',
    APP_URL = 'APP_URL',

    // Authentication
    NEXTAUTH_SECRET = 'NEXTAUTH_SECRET',
    FUSION_AUTH_WELL_KNOWN_URL = 'FUSION_AUTH_WELL_KNOWN_URL',
    FUSION_AUTH_CLIENT_ID = 'FUSION_AUTH_CLIENT_ID',
    FUSION_AUTH_CLIENT_SECRET = 'FUSION_AUTH_CLIENT_SECRET',

    // API
    API_BASE_URL = 'API_BASE_URL',
    API_FE_URL = 'API_FE_URL',

    // Cache
    REDIS_HOST = 'REDIS_HOST',

    // Stripe
    STRIPE_PUBLISHABLE_KEY = 'STRIPE_PUBLISHABLE_KEY',
    STRIPE_SECRET_KEY = 'STRIPE_SECRET_KEY',
}

function getConfigValueFromSecret (from: ConfigOptions): string | false {
    const secretPath = `/run/secrets/${from}`;

    if (!fs.existsSync(secretPath)) {
        return false;
    }

    return fs.readFileSync(secretPath).toString().trim();
}

function getConfigValue (
    from: ConfigOptions,
    defaultVal: string | boolean | number | null = null,
): string | boolean | number {
    const fromEnv = process.env[from];

    if (fromEnv !== undefined) {
        return fromEnv;
    }

    const fromSecret = getConfigValueFromSecret(from);

    if (fromSecret !== false) {
        return fromSecret;
    }

    if (defaultVal !== null) {
        return defaultVal;
    }

    throw new Error([
        from,
        'could not be found in secrets or environment variables',
        'and no default value was provided',
    ].join(' '));
}

export function getConfigString (
    from: ConfigOptions,
    defaultVal: string | null = null,
): string {
    return getConfigValue(from, defaultVal).toString();
}

export const getConfigBoolean = (
    from: ConfigOptions,
    defaultVal: boolean | null = null,
): boolean => {
    const val = getConfigValue(from, defaultVal);

    if (typeof val === 'string') {
        return val === '1';
    }

    if (typeof val === 'number') {
        return val !== 0;
    }

    return val;
};

export function getConfigNumber (
    from: ConfigOptions,
    defaultVal: number | null = null,
): number {
    const val = getConfigValue(from, defaultVal);

    if (typeof val === 'string') {
        return parseInt(val, 10);
    }

    if (typeof val === 'boolean') {
        return val ? 1 : 0;
    }

    return val;
}
