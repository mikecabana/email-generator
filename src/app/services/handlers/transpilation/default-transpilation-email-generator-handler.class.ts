import { injectable } from 'tsyringe';
import { IEmailGeneratorOptions } from '../../../../abstraction';
import {
    EmailGeneratorHandlerBase,
    IEmailGeneratorHandlerContext,
    ITranspilationEmailGeneratorHandler
} from '../../../../abstraction/services/handlers';
import fs from 'fs';
import mjml from 'mjml';

@injectable()
export class DefaultTranspilationEmailGeneratorHandler
    extends EmailGeneratorHandlerBase
    implements ITranspilationEmailGeneratorHandler
{
    handle(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    } {
        return this.transpile(options, context);
    }

    transpile(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    } {
        if (!context.template) {
            return { options, context, output: 'No Template Found' };
        }

        // ToDo: handle when not wanting to in
        // if(!context.template)
        // {
        //     const { t: template } = options;
        //     const templateContent = fs.readFileSync(`templates/${template}.mjml`, 'utf8');
        //     context = { ...context, template: templateContent }
        // }

        const html = mjml(context.template).html;

        // write for easy use
        const dir = 'emails';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        fs.writeFileSync(`${dir}/${options.t}.html`, html);

        context = { ...context, html };

        return { options, context, output: 'Template transpiled' };
    }
}
