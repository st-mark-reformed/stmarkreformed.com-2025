import { execSync } from 'node:child_process';

export function executeInWebContainer (command: string) {
    execSync(
        `docker exec -it smrc_web bash -c "${command}";`,
        { stdio: 'inherit' },
    );
}

export function startSessionInWebContainer () {
    execSync(
        'docker exec -it smrc_web bash',
        { stdio: 'inherit' },
    );
}
