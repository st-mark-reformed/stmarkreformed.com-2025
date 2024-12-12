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
            # API
            cd ${rootDir};
            touch docker/api/.bash_history;
            touch docker/api/.env.local;

            # CMS
            cd ${rootDir};
            touch docker/cms/.bash_history;
            touch docker/cms/.env.local;

            # FusionAuth
            cd ${rootDir};
            touch docker/fusionauth/.env.local;

            # Web
            cd ${rootDir};
            touch docker/web/.bash_history;
            touch docker/web/.env.local;
        `,
        { stdio: 'inherit' },
    );
}
