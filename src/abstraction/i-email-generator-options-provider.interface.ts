import { IEmailGeneratorOptions } from "./i-email-generator-options.interface";

export interface IEmailGeneratorOptionsProvider {
    getEmailGeneratorOptions(): IEmailGeneratorOptions;
}