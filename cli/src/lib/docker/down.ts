import chalk from 'chalk';
import { execSync } from 'node:child_process';

import ensureDevFiles from './ensureDevFiles';

export default async function down (
    {
        rootDir,
        writeToConsole,
    }: {
        rootDir: string;
        writeToConsole: (msg: string) => void;
    },
) {
    const dockerDir = `${rootDir}/docker`;

    writeToConsole(chalk.cyan('Stopping the Docker environment…'));

    ensureDevFiles({ rootDir });

    execSync(
        `
            cd ${dockerDir};
            docker compose -f docker-compose.dev.yml -p smrc down;
        `,
        { stdio: 'inherit' },
    );

    writeToConsole(chalk.green('Docker environment is offline.'));
}
