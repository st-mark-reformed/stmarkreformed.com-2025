import { Command } from '@oclif/core';
import * as fs from 'fs-extra';

import { createWriteToConsole } from '../../createWriteToConsole';
import down from '../../lib/docker/down';

export default class Down extends Command {
    public static description = 'Stops the Docker environment';

    public async run () {
        await down({
            rootDir: fs.realpathSync(`${this.config.root}/../`),
            writeToConsole: createWriteToConsole(this),
        });
    }
}
