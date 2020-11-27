import { injectable } from "tsyringe";
import { IEmailGeneratorOptions, IEmailGeneratorPipelineProcessor } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorPipelineProcessor implements IEmailGeneratorPipelineProcessor {
    processEmailGeneratorPipeline(options: IEmailGeneratorOptions): string[] {

        const outputs: string[] = [];
        const optionsList = Object.entries(options);

        for (const option of optionsList) {

            const [key, value] = option;

            outputs.push(`Using "${key}" option`);
            outputs.push(`Flag: ${value.flag}`);
            outputs.push(`Value: ${value.value}`);
            outputs.push(`========================`);
        }

        return outputs;
    }
}