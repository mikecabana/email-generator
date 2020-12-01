import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, ITranspilationEmailGeneratorHandler } from "../../../../abstraction/services/handlers";

export class DefaultTranspilationEmailGeneratorHandler extends EmailGeneratorHandlerBase implements ITranspilationEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        return this.transpile(options, context);
    }

    transpile(options: IEmailGeneratorOptions, context: unknown): { options: IEmailGeneratorOptions, context: unknown, output?: string } {
        // ToDo: use mjml to transpile the mjml template
        // comes after interpolation

        return { options, context, output: 'Transpiling template.' };
    }
}