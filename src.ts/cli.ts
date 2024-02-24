"use strict";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs-extra";
import { getLogger } from "./logger";
import copy from "./copy";
import child_process from "child_process";

const logger = getLogger();

export function runCLI() {
  // Define a command or functionality
  yargs(hideBin(process.argv))
    .command(
      "new [name]",
      "generates boilerplate template of a metaprotocol using metashrew-as",
      (yargs) => {
        return yargs.positional("name", {
          describe:
            "relative path to the directory where the boilerplate will be generated",
          type: "string",
          default: "my-protocol",
        });
      },
      (argv) => {
        (async () => {
          const destPath = path.join(process.cwd(), argv.name);
	  logger.info('creating new metaprotocol in .' + path.sep + argv.name);
          await copy(
            path.join(__dirname, "..", "template"),
            path.join(process.cwd(), argv.name),
          );
	  process.chdir(destPath);
	  const packageJson = JSON.parse(await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8'));
	  packageJson.name = argv.name
	  packageJson.description = argv.name;
	  logger.info('writing package.json');
	  await fs.writeFile(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
	  logger.info('installing dependencies');
	  child_process.spawnSync('yarn', [], { stdio: 'inherit' });
          logger.info("created ." + path.sep +  argv.name + path.sep);
        })().catch((err) => logger.error(err));
      },
    )
    .demandCommand(1, "You need at least one command before moving on")
    .help()
    .alias("help", "h").argv;
}
