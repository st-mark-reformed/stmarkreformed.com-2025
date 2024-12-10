import chalk from 'chalk';
import * as fs from 'fs-extra';
import { execSync } from 'node:child_process';

import images from './images';

export default async function preUpProvision (
    {
        rootDir,
        writeToConsole,
    }: {
        rootDir: string;
        writeToConsole: (msg: string) => void;
    },
) {
    const dockerDir = `${rootDir}/docker`;

    images.forEach((image) => {
        const provisionFile = `${image}/pre-up-provisioning.sh`;

        const provisionFileFull = `${dockerDir}/${provisionFile}`;

        if (!fs.existsSync(provisionFileFull)) {
            return;
        }

        writeToConsole(
            chalk.cyan(`Running pre-up provisioning for "${image}"…`),
        );

        execSync(
            `
            cd ${dockerDir};
            chmod +x api/pre-up-provisioning.sh;
            api/pre-up-provisioning.sh;
        `,
            { stdio: 'inherit' },
        );

        writeToConsole(
            chalk.green(`Pre-up provisioning for "${image}" finished.`),
        );
    });
}
