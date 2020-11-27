import { injectable } from "tsyringe";
import { IEmailGeneratorOptions, IEmailGeneratorOptionsProvider } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorOptionsProvider implements IEmailGeneratorOptionsProvider {
    getEmailGeneratorOptions(): IEmailGeneratorOptions {
        // const args = process.argv.slice(2);

        return {
            template: {
                flag: '--template',
                value: ''
            },
            email: {
                flag: '--email',
                value: ''
            }
        }
    }
}