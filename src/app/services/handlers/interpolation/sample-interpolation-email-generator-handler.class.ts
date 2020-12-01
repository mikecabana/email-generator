import { injectable } from "tsyringe";
import { IEmailGeneratorOptions } from "../../../../abstraction";
import { EmailGeneratorHandlerBase, IEmailGeneratorHandlerContext, IInterpolationEmailGeneratorHandler } from "../../../../abstraction/services/handlers";

import fs from 'fs';
import handlebars from 'handlebars';

@injectable()
export class SampleInterpolationEmailGeneratorHandler extends EmailGeneratorHandlerBase implements IInterpolationEmailGeneratorHandler {
    handle(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): { options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string } {
        return this.interpolate(options, context);
    }

    interpolate(options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext): { options: IEmailGeneratorOptions, context: IEmailGeneratorHandlerContext, output?: string } {
        const { t: template } = options;
        if (template === 'sample') {

            const templateContent = fs.readFileSync(`templates/${template}.mjml`, 'utf8');
            const interpolateTemplateContent = handlebars.compile(templateContent);
            const interpolatedTemplateContent = interpolateTemplateContent({
                FirstName: 'John Doe',
                OrderNumber: '012345678910',
                OrderDate: 'Jan 1, 2020 12:00 PM',
                TotalPrice: 'CAD$ 42.69',
                CompanyName: 'Hats & Specter'
            });

            context = { ...context, template: interpolatedTemplateContent }

            return { options, context, output: `Interpolated ${options.t}` };
        }

        return { options, context };
    }
}