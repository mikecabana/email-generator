import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, IInterpolationEmailGeneratorHandler } from "../../../../abstraction/services/handlers";

export class SampleInterpolationEmailGeneratorHandler extends EmailGeneratorHandlerBase implements IInterpolationEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        return this.interpolate(options, context);
    }

    interpolate(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        // ToDo: use handlebars to interpolate values in the mjml template
        // comes before transpiling

        if (options.t === 'sample') {
            return { options, context, output: `Interpolate ${options.t}` };
        }

        return { options, context };
    }
}