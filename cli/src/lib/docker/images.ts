const images = [
    'api',
    'cms',
    'web',
] as const;

export default images;

export const imageNameToImageTag = {
    api: 'ghcr.io/st-mark-reformed/smrc-2025-api',
    cms: 'ghcr.io/st-mark-reformed/smrc-2025-cms',
    web: 'ghcr.io/st-mark-reformed/smrc-2025-web',
};

export const imageNameToDockerfilePath = {
    api: 'docker/api/Dockerfile',
    cms: 'docker/cms/Dockerfile',
    web: 'docker/web/Dockerfile',
};

export function getImageTagFromName (image: typeof images[number]) {
    return imageNameToImageTag[image];
}
