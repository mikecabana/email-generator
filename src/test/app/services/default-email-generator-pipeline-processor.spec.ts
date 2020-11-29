import { IEmailGeneratorOptions } from '../../../abstraction';
import { DefaultEmailGeneratorPipelineProcessor } from '../../../app/services';

describe('DefaultEmailGeneratorPipelineProcessor Test Suite', () => {

    it('New instance should not throw', () =>
        expect(() => new DefaultEmailGeneratorPipelineProcessor()).not.toThrow()
    )

    it('Using options should not throw', () =>
        expect(() => {

            const instance = new DefaultEmailGeneratorPipelineProcessor();
            const mockOptions: IEmailGeneratorOptions = {
                $0: '',
                _: [],
                t: '',
                e: []
            }

            instance.processEmailGeneratorPipeline(mockOptions)

        }).not.toThrow()
    )

});