import { injectable } from 'tsyringe';
import { IEmailGeneratorOptions } from '../../../../abstraction';
import {
    EmailGeneratorHandlerBase,
    IEmailGeneratorHandlerContext,
    IInterpolationEmailGeneratorHandler
} from '../../../../abstraction/services/handlers';

import fs from 'fs';
import handlebars from 'handlebars';

@injectable()
export class PortalInterpolationEmailGeneratorHandler
    extends EmailGeneratorHandlerBase
    implements IInterpolationEmailGeneratorHandler
{
    handle(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    } {
        return this.interpolate(options, context);
    }

    interpolate(
        options: IEmailGeneratorOptions,
        context: IEmailGeneratorHandlerContext
    ): {
        options: IEmailGeneratorOptions;
        context: IEmailGeneratorHandlerContext;
        output?: string;
    } {
        const { t: template } = options;
        if (template === 'portal') {
            const templateContent = fs.readFileSync(
                `templates/${template}.mjml`,
                'utf8'
            );
            const interpolateTemplateContent =
                handlebars.compile(templateContent);
            const interpolatedTemplateContent = interpolateTemplateContent({
                statement: 'This is a statement test!',
                content: 'This is as many call to actions as you want!',
                actions: [
                    {
                        label: 'Click Me',
                        link: 'https://google.ca'
                    },
                    {
                        label: 'Click Me 2',
                        link: 'https://google.ca'
                    }
                ],
                year: new Date().getFullYear(),
                termsLink: 'https://google.ca',
                privacyLink: 'https://google.ca'
            });

            context = { ...context, template: interpolatedTemplateContent };

            return { options, context, output: `Interpolated ${options.t}` };
        }

        return { options, context };
    }
}
