import { injectable, injectAll } from "tsyringe";
import { EmailGeneratorPipelineProcessorBase, IEmailGeneratorPipelineProcessor } from "../../abstraction";
import { IEmailGeneratorHandler } from "../../abstraction/services/handlers";

@injectable()
export class DefaultEmailGeneratorPipelineProcessor extends EmailGeneratorPipelineProcessorBase implements IEmailGeneratorPipelineProcessor {
    constructor(
        @injectAll('IEmailGeneratorHandler') handlers: IEmailGeneratorHandler[]
    ) {
        super(handlers);
    }
}