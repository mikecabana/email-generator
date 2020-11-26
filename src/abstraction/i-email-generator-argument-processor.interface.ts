import { IEmailGeneratorOptions } from "./i-email-generator-options.interface";

export interface IEmailGeneratorArguentProcessor {
    processEmailGeneratorArguments(...args: string[]): IEmailGeneratorOptions;
}