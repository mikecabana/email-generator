import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";

export interface IEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions): IEmailGeneratorOptions;
    hasOption(flag: string, options: IEmailGeneratorOptions): boolean;
}