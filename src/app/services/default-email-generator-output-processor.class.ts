import { injectable } from "tsyringe";
import { IEmailGeneratorOutputProcessor } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorOutputProcessor implements IEmailGeneratorOutputProcessor {
    processEmailGeneratorOutputs(outputs: string | string[]): void {
        if (outputs instanceof Array) {
            for (const o of outputs) {
                console.log(o);
            }
        } else {
            console.log(outputs);
        }
    }
}