import { IEmailGeneratorOptions } from '../../i-email-generator-options.interface';
import { IEmailGeneratorHandlerContext } from './i-email-generator-handler-context.interface';

export interface IEmailGeneratorHandler {
    handle(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    };
}
