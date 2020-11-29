export interface IEmailGeneratorOutputProcessor {
    processEmailGeneratorOutputs(outputs: string | string[]): void
}