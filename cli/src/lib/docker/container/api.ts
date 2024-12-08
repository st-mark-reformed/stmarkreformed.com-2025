import { execSync } from 'node:child_process';

export function executeInApiContainer (command: string) {
    execSync(
        `docker exec -it smrc_api bash -c "${command}";`,
        { stdio: 'inherit' },
    );
}

export function startSessionInApiContainer () {
    execSync(
        'docker exec -it smrc_api bash',
        { stdio: 'inherit' },
    );
}
