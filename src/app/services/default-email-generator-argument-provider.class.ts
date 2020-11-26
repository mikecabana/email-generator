import { IEmailGeneratorArgumentProvider } from "../../abstraction";

export class DefaultEmailGeneratorArgumentProvider implements IEmailGeneratorArgumentProvider {
    getEmailGeneratorArguments(): string[] {
        return process.argv.slice(2);
    }
}