import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";

export interface ISenderEmailGeneratorHandler {
    send(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string };
}