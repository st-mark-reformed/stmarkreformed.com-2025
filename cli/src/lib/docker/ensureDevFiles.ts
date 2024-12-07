import { execSync } from 'node:child_process';

export default function ensureDevFiles (
    {
        rootDir,
    }: {
        rootDir: string;
    },
) {
    execSync(
        `
            cd ${rootDir};
            touch docker/api/.bash_history;
            touch docker/api/.env.local;
        `,
        { stdio: 'inherit' },
    );
}
