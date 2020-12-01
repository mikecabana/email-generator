import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";
import { IEmailGeneratorHandler } from "./i-email-generator-handler.interface";

export abstract class EmailGeneratorHandlerBase implements IEmailGeneratorHandler {
    abstract handle(options: IEmailGeneratorOptions, context: unknown): {options: IEmailGeneratorOptions, context: unknown, output?: string };
}