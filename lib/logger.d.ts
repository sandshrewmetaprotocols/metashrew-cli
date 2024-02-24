import { createLogger as createWinstonLogger } from "winston";
interface MetashrewLogger extends ReturnType<typeof createWinstonLogger> {
    star(v: any): MetashrewLogger;
}
export declare function getLogger(): MetashrewLogger;
export {};
