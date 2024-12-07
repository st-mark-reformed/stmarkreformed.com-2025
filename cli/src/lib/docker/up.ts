import chalk from 'chalk';
import * as fs from 'fs-extra';
import { execSync } from 'node:child_process';

import build from './build';
import buildIfNeeded from './buildIfNeeded';
import ensureDevFiles from './ensureDevFiles';
import preUpProvision from './preUpProvision';

export default async function up (
    {
        inPlace = false,
        rootDir,
        shouldBuild = false,
        skipProvision = false,
        writeToConsole,
    }: {
        inPlace?: boolean;
        rootDir: string;
        shouldBuild?: boolean;
        skipProvision?:boolean;
        writeToConsole: (msg: string) => void;
    },
) {
    const dockerDir = `${rootDir}/docker`;
    const ephemeralStorageDir = `${dockerDir}/_ephemeral-storage`;

    if (!fs.existsSync(ephemeralStorageDir)) {
        fs.mkdirSync(ephemeralStorageDir);
    }

    ensureDevFiles({ rootDir });

    if (shouldBuild) {
        build({ rootDir, writeToConsole });
    } else {
        buildIfNeeded({ rootDir, writeToConsole });
    }

    if (!skipProvision) {
        await preUpProvision({ rootDir, writeToConsole });
    }

    writeToConsole(chalk.cyan('Bringing the Docker environment online…'));

    if (inPlace) {
        execSync(
            `
                cd ${dockerDir};
                docker compose -f docker-compose.dev.yml -p smrc up;
            `,
            { stdio: 'inherit' },
        );

        return;
    }

    execSync(
        `
            cd ${dockerDir};
            docker compose -f docker-compose.dev.yml -p smrc up -d --wait;
        `,
        { stdio: 'inherit' },
    );

    writeToConsole(chalk.green('Docker environment is online.'));
}
