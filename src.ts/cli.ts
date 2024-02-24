"use strict";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import { getLogger } from "./logger";
import copy from "./copy";

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
          await copy(
            path.join(__dirname, "..", "template"),
            path.join(process.cwd(), argv.name),
          );
          logger.info("created  " + argv.name + path.sep);
        })().catch((err) => logger.error(err));
      },
    )
    .demandCommand(1, "You need at least one command before moving on")
    .help()
    .alias("help", "h").argv;
}
