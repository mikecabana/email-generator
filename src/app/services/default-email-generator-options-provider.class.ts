import { injectable } from "tsyringe";
import yargs from 'yargs/yargs';
import { terminalWidth } from 'yargs';
import { IEmailGeneratorOptions, IEmailGeneratorOptionsProvider } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorOptionsProvider implements IEmailGeneratorOptionsProvider {
    getEmailGeneratorOptions(): IEmailGeneratorOptions {

        const args = yargs(process.argv.slice(2))
            .usage('Usage: $0 [options]')
            .options({
                t: { type: 'string', alias: 'template', desc: 'Supply a template name', demandOption: true },
                e: { type: 'array', alias: 'email', desc: 'Provide a list of emails to test with' }
            })
            .example('$0 -t receipt -e john@example.com jane@example.com', 'Generate a template and send test emails')
            .version('v')
            .alias('v', 'version')
            .help('h')
            .alias('h', 'help')
            .wrap(terminalWidth())
            .argv;

        return args;
    }
}