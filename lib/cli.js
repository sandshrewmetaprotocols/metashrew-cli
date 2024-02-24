"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = void 0;
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger_1 = require("./logger");
const copy_1 = __importDefault(require("./copy"));
const child_process_1 = __importDefault(require("child_process"));
const logger = (0, logger_1.getLogger)();
function runCLI() {
    // Define a command or functionality
    (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .command("new [name]", "generates boilerplate template of a metaprotocol using metashrew-as", (yargs) => {
        return yargs.positional("name", {
            describe: "relative path to the directory where the boilerplate will be generated",
            type: "string",
            default: "my-protocol",
        });
    }, (argv) => {
        (async () => {
            const destPath = path_1.default.join(process.cwd(), argv.name);
            await (0, copy_1.default)(path_1.default.join(__dirname, "..", "template"), path_1.default.join(process.cwd(), argv.name));
            process.chdir(destPath);
            const packageJson = JSON.parse(await fs_extra_1.default.readFile(path_1.default.join(process.cwd(), 'package.json'), 'utf8'));
            packageJson.name = argv.name;
            packageJson.description = argv.name;
            logger.info('writing package.json');
            await fs_extra_1.default.writeFile(path_1.default.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
            logger.info('installing dependencies');
            child_process_1.default.spawnSync('yarn', [], { stdio: 'inherit' });
            logger.info("created " + argv.name + path_1.default.sep);
        })().catch((err) => logger.error(err));
    })
        .demandCommand(1, "You need at least one command before moving on")
        .help()
        .alias("help", "h").argv;
}
exports.runCLI = runCLI;
//# sourceMappingURL=cli.js.map