import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";
import { IEmailGeneratorHandlerContext } from "./i-email-generator-handler-context.interface";
import { IEmailGeneratorHandler } from "./i-email-generator-handler.interface";

export abstract class EmailGeneratorHandlerBase implements IEmailGeneratorHandler {
    abstract handle(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): {options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string };
}