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
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    poweredByHeader: false,
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/calendar/ics',
                destination: '/ics/calendar',
                permanent: true,
            },
        ];
    }
};
