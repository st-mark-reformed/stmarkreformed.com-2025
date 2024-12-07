import { Command } from '@oclif/core';

export const createWriteToConsole = (command: Command) => (msg: string) => {
    command.log(msg);
};
