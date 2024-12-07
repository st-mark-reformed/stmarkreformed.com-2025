import * as fs from 'fs-extra';
import md5 from 'md5';

import { imageNameToDockerfilePath } from './images';

export function getHashFromImageDockerfile (
    {
        imageName,
        rootDir,
    }: {
        imageName: string;
        rootDir: string;
    },
): string {
    // @ts-expect-error TS7053
    const dockerfilePath = `${rootDir}/${imageNameToDockerfilePath[imageName]}`;

    return md5(fs.readFileSync(dockerfilePath).toString());
}

export function getPreviousHash (
    {
        imageName,
        rootDir,
    }: {
        imageName: string;
        rootDir: string;
    },
): string {
    const ephemeralStorageDir = `${rootDir}/docker/_ephemeral-storage`;

    const fileName = `${ephemeralStorageDir}/dockerfile-hashes/${imageName}`;

    if (!fs.existsSync(fileName)) {
        return '';
    }

    return fs.readFileSync(fileName).toString().trim();
}

export function writeFileHash (
    {
        imageName,
        rootDir,
    }: {
        imageName: string;
        rootDir: string;
    },
) {
    const hash = getHashFromImageDockerfile({
        imageName,
        rootDir,
    });

    const ephemeralStorageDir = `${rootDir}/docker/_ephemeral-storage`;

    const dockerfileHashesDir = `${ephemeralStorageDir}/dockerfile-hashes`;

    const fileName = `${dockerfileHashesDir}/${imageName}`;

    if (!fs.existsSync(dockerfileHashesDir)) {
        fs.mkdir(dockerfileHashesDir, { recursive: true });
    }

    fs.writeFileSync(fileName, hash);
}
