import { IEmailGeneratorOptions } from "../../i-email-generator-options.interface";

export interface IInterpolationEmailGeneratorHandler {
    interpolate(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string };
}