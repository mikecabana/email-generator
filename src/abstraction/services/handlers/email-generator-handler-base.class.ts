import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";
import { IEmailGeneratorHandler } from "./i-email-generator-handler.class";

export abstract class EmailGeneratorHandlerBase implements IEmailGeneratorHandler {
    abstract handle(options: IEmailGeneratorOptions): IEmailGeneratorOptions;
}