import { injectable } from "tsyringe";
import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, IEmailGeneratorHandlerContext, ITranspilationEmailGeneratorHandler } from "../../../../abstraction/services/handlers";
import fs from 'fs';
import mjml from 'mjml';

@injectable()
export class DefaultTranspilationEmailGeneratorHandler extends EmailGeneratorHandlerBase implements ITranspilationEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): { options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string } {
        return this.transpile(options, context);
    }

    transpile(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): { options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string } {
        const html = mjml(context.template).html;

        // write for easy use
        const dir = 'emails';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(`${dir}/${options.t}.html`, html);

        context = { ...context, html }

        return { options, context, output: 'Template transpiled' };
    }
}