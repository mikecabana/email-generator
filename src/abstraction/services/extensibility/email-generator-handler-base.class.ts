import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";
import { IEmailGeneratorHandler } from "./i-email-generator-handler.class";

export abstract class EmailGeneratorHandlerBase implements IEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions): IEmailGeneratorOptions;
    // hasOption(flag: string, options: IEmailGeneratorOptions): boolean {
    //     // if () {}
    // }

}