const images = [
    'api',
    'api-queue-consumer',
    'cms',
    'web',
] as const;

export default images;

export const imageNameToImageTag = {
    api: 'ghcr.io/st-mark-reformed/smrc-2025-api',
    'api-queue-consumer': 'ghcr.io/st-mark-reformed/smrc-2025-api-queue-consumer',
    cms: 'ghcr.io/st-mark-reformed/smrc-2025-cms',
    web: 'ghcr.io/st-mark-reformed/smrc-2025-web',
};

export const imageNameToDockerfilePath = {
    api: 'docker/api/Dockerfile',
    'api-queue-consumer': 'docker/api-queue-consumer/Dockerfile',
    cms: 'docker/cms/Dockerfile',
    web: 'docker/web/Dockerfile',
};

export function getImageTagFromName (image: typeof images[number]) {
    return imageNameToImageTag[image];
}
