import { inject, injectable } from "tsyringe";
import { EmailGeneratorManagerBase, IEmailGeneratorOptionsProvider, IEmailGeneratorOutputProcessor, IEmailGeneratorPipelineProcessor } from "../../abstraction";

@injectable()
export class DefaultEmailGeneratorManager extends EmailGeneratorManagerBase {
    constructor(
        @inject('IEmailGeneratorOptionsProvider') optionsProvider: IEmailGeneratorOptionsProvider,
        @inject('IEmailGeneratorPipelineProcessor') pipelineProcessor: IEmailGeneratorPipelineProcessor,
        @inject('IEmailGeneratorOutputProcessor') outputProcessor: IEmailGeneratorOutputProcessor,
    ){
        super(optionsProvider, pipelineProcessor, outputProcessor);
    }
}