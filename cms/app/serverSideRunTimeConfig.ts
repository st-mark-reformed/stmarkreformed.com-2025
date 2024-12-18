import fs from 'fs';

/**
 * These must be defined as environment variables or docker secrets
 */
export enum ConfigOptions {
    DEV_MODE = 'DEV_MODE',
    APP_URL = 'APP_URL',
    FRONT_END_URL = 'FRONT_END_URL',

    // Authentication
    NEXTAUTH_SECRET = 'NEXTAUTH_SECRET',
    FUSION_AUTH_WELL_KNOWN_URL = 'FUSION_AUTH_WELL_KNOWN_URL',
    FUSION_AUTH_CLIENT_ID = 'FUSION_AUTH_CLIENT_ID',
    FUSION_AUTH_CLIENT_SECRET = 'FUSION_AUTH_CLIENT_SECRET',

    // API
    API_BASE_URL = 'API_BASE_URL',

    // Cache
    REDIS_HOST = 'REDIS_HOST',
}

const getConfigValue = (
    from: ConfigOptions,
    defaultVal: string | boolean | number,
): string | boolean | number => {
    const fromEnv = process.env[from];

    if (fromEnv !== undefined) {
        return fromEnv;
    }

    const secretPath = `/run/secrets/${from}`;

    if (fs.existsSync(secretPath)) {
        return fs.readFileSync(secretPath).toString();
    }

    return defaultVal;
};

export const getConfigString = (
    from: ConfigOptions,
    defaultVal: string = '',
): string => getConfigValue(from, defaultVal).toString();

export const getConfigBoolean = (
    from: ConfigOptions,
    defaultVal: boolean = false,
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

export const getConfigNumber = (
    from: ConfigOptions,
    defaultVal: number = 0,
): number => {
    const val = getConfigValue(from, defaultVal);

    if (typeof val === 'string') {
        return parseInt(val, 10);
    }

    if (typeof val === 'boolean') {
        return val ? 1 : 0;
    }

    return val;
};
