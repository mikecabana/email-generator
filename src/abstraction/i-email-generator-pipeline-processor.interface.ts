import { IEmailGeneratorOptions } from './i-email-generator-options.interface';

export interface IEmailGeneratorPipelineProcessor {
    processEmailGeneratorPipeline(options: IEmailGeneratorOptions): string[];
}
