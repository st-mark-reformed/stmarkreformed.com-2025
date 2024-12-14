import { execSync } from 'node:child_process';

export function executeInCmsContainer (command: string) {
    execSync(
        `docker exec -it smrc_cms bash -c "${command}";`,
        { stdio: 'inherit' },
    );
}

export function startSessionInCmsContainer () {
    execSync(
        'docker exec -it smrc_cms bash',
        { stdio: 'inherit' },
    );
}
