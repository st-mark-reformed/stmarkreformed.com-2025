const images = [
    'api',
] as const;

export default images;

export const imageNameToImageTag = {
    api: 'ghcr.io/st-mark-reformed/smrc-2025-api',
};

export const imageNameToDockerfilePath = {
    api: 'docker/api/Dockerfile',
};

export function getImageTagFromName (image: typeof images[number]) {
    return imageNameToImageTag[image];
}
