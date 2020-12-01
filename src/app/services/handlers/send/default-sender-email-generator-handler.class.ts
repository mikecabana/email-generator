import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, ISenderEmailGeneratorHandler } from "../../../../abstraction/services/handlers";

export class DefaultSenderEmailGeneratorHandler extends EmailGeneratorHandlerBase implements ISenderEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        return this.send(options, context);
    }

    send(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        if (options.e && options.e.length > 0) {
            return { options, context, output: 'Send test emails' };
        }
        return { options, context };
    }
}