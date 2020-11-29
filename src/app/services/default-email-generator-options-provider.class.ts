import { injectable } from "tsyringe";
import { Argv } from 'yargs';
import yargs from 'yargs/yargs';
import { IEmailGeneratorOptions, IEmailGeneratorOptionsProvider } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorOptionsProvider implements IEmailGeneratorOptionsProvider {

    yargs: Argv<IEmailGeneratorOptions>;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.yargs = (yargs(process.argv.slice(2)) as any)
            .usage('Usage: $0 [options]')
            .options({
                t: { type: 'string', alias: 'template', desc: 'Supply a template name', demandOption: true },
                e: { type: 'array', alias: 'email', desc: 'Provide a list of emails to test with' }
            })
            .example('$0 -t receipt -e john@example.com jane@example.com', 'Generate a template and send test emails')
            .alias('v', 'version')
            .alias('h', 'help');
    }

    getEmailGeneratorOptions(): IEmailGeneratorOptions {
        return this.yargs.argv;
    }

    testGetEmailGeneratorOptions(): IEmailGeneratorOptions {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return this.yargs.fail((msg, err, yargs) => {
            if (msg) {
                throw new Error(msg)
            }
        }).argv;
    }
}