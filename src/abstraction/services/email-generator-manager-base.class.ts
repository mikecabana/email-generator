import { IEmailGeneratorOptionsProvider } from "../i-email-generator-options-provider.interface";
import { IEmailGeneratorPipelineProcessor } from "../i-email-generator-pipeline-processor.interface";
import { IEmailGeneratorOutputProcessor } from "../i-email-generator-output-processor.interface";

export abstract class EmailGeneratorManagerBase {

    private readonly _optionsProvider: IEmailGeneratorOptionsProvider;
    private readonly _pipelineProcessor: IEmailGeneratorPipelineProcessor;
    private readonly _outputProcessor: IEmailGeneratorOutputProcessor;

    constructor(
        optionsProvider: IEmailGeneratorOptionsProvider, 
        pipelineProcessor: IEmailGeneratorPipelineProcessor, 
        outputProcessor: IEmailGeneratorOutputProcessor) {
        this._optionsProvider = optionsProvider;
        this._pipelineProcessor = pipelineProcessor;
        this._outputProcessor = outputProcessor;
    }

    public init(): void {
        const opts = this._optionsProvider.getEmailGeneratorOptions();
        const outputs = this._pipelineProcessor.processEmailGeneratorPipeline(opts);
        this._outputProcessor.processEmailGeneratorOutputs(outputs)
    }
}