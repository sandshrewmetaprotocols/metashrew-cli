"use strict";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";


export function runCLI() {
  // Define a command or functionality
  yargs(hideBin(process.argv))
  .command('generate [name]', 'generates boilerplate template of a metaprotocol using metashrew-as', (yargs) => {
    return yargs.positional('name', {
      describe: 'relative path to the directory where the boilerplate will be generated',
      type: 'string',
      default: 'my-protocol',
    });
  }, (argv) => {
    fs.cpSync(path.join(__dirname, 'templates', 'my-protocol'), path.join(process.cwd(), argv.name), { recursive: true});
    console.log(`new metaprotocol template at:, ${argv.name}!`);
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .alias('help', 'h')
  .argv;
}
