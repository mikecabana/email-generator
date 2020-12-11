# Email Generator
📨 Simple CLI to generate responsive emails using MJML for templating and handlebars for interpolation.

## ToC
- [Install](#install)
- [Create a template](#create-a-template)
- [Create a template handler](#create-a-template-handler)
- [Generate your email](#generate-your-email)
- [Send a test email](#send-a-test-email)
- [Options](#options)

## Install
```cmd
npm install
```

## Create a template

In the `templates` directory, create a new `MJML` file.
```
templates
└── sample.mjml
```
**MJML** is a markup language similar to **HTML**. It allows you to easily create responsive email templates. **MJML** then transpiles the template to valid **HTML** supported by email clients. Read the [docs](https://mjml.io/documentation/)

The following is a sample **MJML** template and can be used as a valid template in this generator.
```html
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>

        <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">{{greetings}}</mj-text> <!--  <<-- notice the handlebars syntax -->

      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```
This generator also supports interpolation via **handlebars**. Check out their [guide](https://handlebarsjs.com/guide/) for more information. 

The generator will first interpolate your template then transpile the MJML into valid HTML. This order is important. While the reverse is doable, doing it in this order makes it immensely easier to take advantage of handlebars built-in helpers.

## Create a template handler

In the `src/app/services/handlers/interpolation/` directory, create a new handler using the following naming convention.
```
<YOUR-TEMPLATE-NAME>-interpolation-email-generator-handler.class.ts
```
Create a new class that extends `EmailGeneratorHandlerBase` and implements `IInterpolationEmailGeneratorHandler`
```typescript
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
                // this is where you pass data for your template
                greetings: 'Hello World'
            });

            context = { ...context, template: interpolatedTemplateContent }

            return { options, context, output: `Interpolated ${options.t}` };
        }

        return { options, context };
    }
}
```

This code will be the same for every interpolation handler and there should be one for each template. 

In hindsight I can abstract this code eventually (or if someone wants to submit a PR go for it 😜).
The only thing that needs to be changed is the data you're passing to your template in the `interpolateTemplateContent` function.

Once that's done you can save and close the file.

### Add your handler to DI

Open `src/app/internal/dependency-injection.class.ts` and register your new handler.

```typescript
// handlers
        container
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', { useClass: SampleInterpolationEmailGeneratorHandler })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', { useClass: /* YOUR_HANDLER_HERE */ })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', { useClass: DefaultTranspilationEmailGeneratorHandler })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', { useClass: DefaultSenderEmailGeneratorHandler });
``` 
**It's important you keep the registration order for this tool to work properly. All your handlers should be added before the `DefaultTranspilationEmailGeneratorHandler` and the `DefaultSenderEmailGeneratorHandler`**

## Generate your email

Now that you have a tempalte and am interpolation handler, we can finally generate your email.
To do so, run
```cmd
npm run start -- -t sample
```
or 
```cmd
npm run start -- --template sample
```

This will output a valid html email in the `email` directory.

## Send a test email

If you would like to send you're generated email as a test, there's a handler for that! 
Open or create the `.env` file and set the environment variables for  `EMAIL_USER` with your email, `EMAIL_PASS` with your emails password and `EMAIL_HOST` with your mail server. 

### Enhancement

Allow seeing these arguments via the commandline.

Now run
```cmd
npm run start -- -t sample -e jd@example.com
```
or 
```cmd
npm run start -- --template sample --email jd@example.com
```

## Options

```cmd
Usage: main [options]

Options:
  -t, --template  Supply a template name                                          [string] [required]
  -e, --email     Provide a list of emails to test with                                       [array]
  -v, --version   Show version number                                                       [boolean]
  -h, --help      Show help                                                                 [boolean]

Examples:
  main -t receipt -e john@example.com jane@example.com       Generate a template and send test emails               
```
