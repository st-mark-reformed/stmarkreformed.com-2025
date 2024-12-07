import { confirm } from '@inquirer/prompts';
import { Command } from '@oclif/core';
import chalk from 'chalk';
import * as fs from 'fs-extra';
import { execSync } from 'node:child_process';

import { createWriteToConsole } from '../../createWriteToConsole';
import down from '../../lib/docker/down';
import up from '../../lib/docker/up';
import images, {getImageTagFromName, imageNameToImageTag} from "../../lib/docker/images";

export default class FromScratch extends Command {
    public static description = `${chalk.red('WARNING: Deletes all ephemeral data and volumes, vendor files, and node_modules associated with the docker environment and rebuild it')}`;

    public async run () {
        this.log(chalk.red(
            'WARNING: Deletes all ephemeral data and volumes, vendor files, and node_modules associated with the docker environment and rebuild it',
        ));

        this.log(chalk.cyan('(gonna take a hot second)'));

        const proceed = await confirm({
            default: false,
            message: 'Continue?',
            theme: {
                prefix: '',
            },
        });

        if (!proceed) {
            this.log(chalk.yellow('Aborting…'));

            return;
        }

        const rootDir = fs.realpathSync(`${this.config.root}/../`);

        const commonArguments = {
            rootDir,
            writeToConsole: createWriteToConsole(this),
        };

        await down(commonArguments);

        images.forEach((image) => {
            const tag = getImageTagFromName(image);

            execSync(
                `
                    # Remove api image
                    docker image rm ${tag};
                `,
                { stdio: 'inherit' },
            );
        });

        execSync(
            `
                # Remove api vendor directory
                rm -rf api/vendor;
            `,
            { stdio: 'inherit' },
        );

        await up(commonArguments);
    }
}
