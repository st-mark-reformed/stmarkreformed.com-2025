import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import * as fs from 'fs-extra';

import { createWriteToConsole } from '../../createWriteToConsole';
import down from '../../lib/docker/down';
import up from '../../lib/docker/up';

export default class Restart extends Command {
    public static description = 'This is useful as a single command instead of having to run two commands if you\'re having some trouble you suspect is related to the containers being in a strange state of some kind. This basically ensures your containers are running from the clean images.';

    public static flags = {
        build: Flags.boolean({
            char: 'b',
            default: false,
        }),
        'run-provisioning': Flags.boolean({
            char: 'p',
            default: false,
        }),
    };

    public static summary = `Runs ${chalk.cyan('docker down')} then ${chalk.cyan('docker up')}.`;

    public async run () {
        const { flags } = await this.parse(Restart);

        const commonArguments = {
            rootDir: fs.realpathSync(`${this.config.root}/../`),
            writeToConsole: createWriteToConsole(this),
        };

        await down(commonArguments);

        await up({
            ...commonArguments,
            shouldBuild: flags.build,
            skipProvision: !flags['run-provisioning'],
        });
    }
}
