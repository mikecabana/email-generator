import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";

export interface ITranspilationEmailGeneratorHandler {
    transpile(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string };
}