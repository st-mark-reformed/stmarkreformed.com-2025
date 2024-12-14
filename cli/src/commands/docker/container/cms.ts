import { Command } from '@oclif/core';
import chalk from 'chalk';

import { executeInCmsContainer, startSessionInCmsContainer } from '../../../lib/docker/container/cms';

export default class Cms extends Command {
    public static description = 'If this command is run without arguments, a shell session will be started in the cms container and you will be placed in that shell session. However, any arguments provided will, instead, be passed into and run in the shell session and then the session will exit. The latter is most often how you will use this command.';

    // Allow variable arguments
    public static strict = false;

    public static summary = `Execute command in the ${chalk.cyan('cms')} container. Empty argument starts a shell session`;

    public async run () {
        this.log(chalk.yellow(
            "You're working inside the 'cms' application container of this project.",
        ));

        if (this.argv.length > 0) {
            executeInCmsContainer(this.argv.join(' '));

            return;
        }

        this.log(chalk.yellow("Remember to exit when you're done"));

        startSessionInCmsContainer();
    }
}
