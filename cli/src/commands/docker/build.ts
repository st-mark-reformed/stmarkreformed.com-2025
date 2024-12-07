import { Command, Flags } from '@oclif/core';
import * as fs from 'fs-extra';

import { createWriteToConsole } from '../../createWriteToConsole';
import build from '../../lib/docker/build';
import dockerImages from '../../lib/docker/images';

export default class Build extends Command {
    public static description = 'Build Docker images';

    public static flags = {
        images: Flags.string({
            char: 'i',
            // @ts-expect-error TS2769
            default: dockerImages,
            multiple: true,
            // @ts-expect-error TS2769
            options: dockerImages,
        }),
    };

    public async run () {
        // @ts-expect-error TS2345
        const { flags } = await this.parse(Build);

        build({
            // @ts-expect-error TS2322
            images: flags.images as Array<string>,
            rootDir: fs.realpathSync(`${this.config.root}/../`),
            writeToConsole: createWriteToConsole(this),
        });
    }
}
