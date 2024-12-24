// @ts-check

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    publicRuntimeConfig: {
    },
    serverRuntimeConfig: {
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '500mb',
        },
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    reactStrictMode: true,
};
