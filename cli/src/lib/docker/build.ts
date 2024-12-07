import chalk from 'chalk';
import { execSync } from 'node:child_process';

import { writeFileHash } from './dockerfileHash';
import allImages, { getImageTagFromName } from './images';

export default function build (
    {
        images = allImages,
        rootDir,
        writeToConsole,
    }: {
        images?: typeof allImages;
        rootDir: string;
        writeToConsole: (msg: string) => void;
    },
) {
    images.forEach((image) => {
        writeToConsole(chalk.cyan(`Building Docker ${image} image`));

        const tag = getImageTagFromName(image);

        execSync(
            `
                cd ${rootDir};
                docker build \
                  --build-arg BUILDKIT_INLINE_CACHE=1 \
                  --cache-from ${tag} \
                  --file docker/${image}/Dockerfile \
                  --tag ${tag} \
                  .
            `,
            { stdio: 'inherit' },
        );

        writeFileHash({
            imageName: image,
            rootDir,
        });

        writeToConsole(chalk.green(`Finished building ${image} image`));
    });
}
