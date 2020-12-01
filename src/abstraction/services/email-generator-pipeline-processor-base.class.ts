import { IEmailGeneratorOptions } from "../i-email-generator-options.interface";
import { IEmailGeneratorPipelineProcessor } from "../i-email-generator-pipeline-processor.interface";
import { IEmailGeneratorHandler } from "./handlers";

export abstract class EmailGeneratorPipelineProcessorBase implements IEmailGeneratorPipelineProcessor {

    private readonly _handlers: IEmailGeneratorHandler[];

    constructor(
        handlers: IEmailGeneratorHandler[]
    ) {
        this._handlers = handlers
    }

    processEmailGeneratorPipeline(options: IEmailGeneratorOptions): string[] {
        let o = options;
        let c: unknown = null;
        const outputs: string[] = [];
        for (const handler of this._handlers) {
            const handled = handler.handle(o, c);
            o = handled.options;
            c = handled.context;
            if (handled.output) {
                outputs.push(handled.output);
            }
        }
        return outputs;
    }
}