import chalk from 'chalk';
import { execSync } from 'node:child_process';

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

    writeToConsole(chalk.cyan('Running pre-up provisioning for API…'));
    execSync(
        `
            cd ${dockerDir};
            chmod +x api/pre-up-provisioning.sh;
            api/pre-up-provisioning.sh;
        `,
        { stdio: 'inherit' },
    );
    writeToConsole(chalk.green('Pre-up provisioning for API finished.'));
}
