import { injectable } from "tsyringe";
import { IEmailGeneratorOptions, IEmailGeneratorPipelineProcessor } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorPipelineProcessor implements IEmailGeneratorPipelineProcessor {
    processEmailGeneratorPipeline(options: IEmailGeneratorOptions): string[] {

        const outputs: string[] = [];

        outputs.push(`========================`);
        outputs.push(`OPTIONS:`);
        outputs.push(JSON.stringify(options));
        outputs.push(`========================`);

        return outputs;
    }
}