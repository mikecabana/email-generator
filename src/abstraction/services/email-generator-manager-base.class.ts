import { IEmailGeneratorArguentProcessor } from "../i-email-generator-argument-processor.interface";
import { IEmailGeneratorArgumentProvider } from "../i-email-generator-argument-provider.interface";
import { IEmailGeneratorOutputProcessor } from "../i-email-generator-output-processor.interface";

export abstract class EmailGeneratorManagerBase {

    private readonly _argumentProvider: IEmailGeneratorArgumentProvider;
    private readonly _argumentProcessor: IEmailGeneratorArguentProcessor;
    private readonly _outputProcessor: IEmailGeneratorOutputProcessor;

    constructor(
        argumentProvider: IEmailGeneratorArgumentProvider, 
        argumentProcessor: IEmailGeneratorArguentProcessor, 
        outputProcessor: IEmailGeneratorOutputProcessor) {
        this._argumentProvider = argumentProvider;
        this._argumentProcessor = argumentProcessor;
        this._outputProcessor = outputProcessor;
    }

    public init(): void {
        const args = this._argumentProvider.getEmailGeneratorArguments();
        const opts = this._argumentProcessor.processEmailGeneratorArguments(...args);
        // ToDo: use the options in the pipeline 
        this._outputProcessor.processEmailGeneratorOutputs('')
    }
}