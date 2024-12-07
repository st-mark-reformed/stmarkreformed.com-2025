import { execSync } from 'node:child_process';

import build from './build';
import { getHashFromImageDockerfile, getPreviousHash } from './dockerfileHash';
import allImages, {getImageTagFromName, imageNameToImageTag} from './images';

export default function buildIfNeeded (
    {
        rootDir,
        writeToConsole,
    }: {
        rootDir: string;
        writeToConsole: (msg: string) => void;
    },
) {
    const images = allImages.filter((image) => {
        const buildHash = getHashFromImageDockerfile({
            imageName: image,
            rootDir,
        });

        const previousHash = getPreviousHash({
            imageName: image,
            rootDir,
        });

        if (previousHash !== buildHash) {
            return true;
        }

        const tag = getImageTagFromName(image);

        const tagCheck = execSync(`docker images -q ${tag}`)
            .toString()
            .trim();

        return tagCheck === '';
    });

    build({
        // @ts-expect-error TS2322
        images,
        rootDir,
        writeToConsole,
    });
}
