import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, IInterpolationEmailGeneratorHandler } from "../../../../abstraction/services/handlers";

export class ReceiptInterpolationEmailGeneratorHandler extends EmailGeneratorHandlerBase implements IInterpolationEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        return this.interpolate(options, context);
    }

    interpolate(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        if (options.t === 'receipt') {
            return { options, context, output: `Interpolate ${options.t}` };
        }
        return { options, context };
    }
}