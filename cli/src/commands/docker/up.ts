import { Command, Flags } from '@oclif/core';
import * as fs from 'fs-extra';

import { createWriteToConsole } from '../../createWriteToConsole';
import up from '../../lib/docker/up';

export default class Up extends Command {
    public static description = 'Brings Docker environment online and runs provisioning as necessary';

    public static flags = {
        build: Flags.boolean({
            char: 'b',
            default: false,
        }),
        'in-place': Flags.boolean({
            char: 'i',
            default: false,
            description: 'Run docker up without the detach flag',
        }),
        'skip-provision': Flags.boolean({
            char: 's',
            default: false,
        }),
    };

    public async run () {
        const { flags } = await this.parse(Up);

        await up({
            inPlace: flags['in-place'],
            rootDir: fs.realpathSync(`${this.config.root}/../`),
            shouldBuild: flags.build,
            skipProvision: flags['skip-provision'],
            writeToConsole: createWriteToConsole(this),
        });
    }
}
