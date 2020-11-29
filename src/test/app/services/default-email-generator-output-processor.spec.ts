import { DefaultEmailGeneratorOutputProcessor } from '../../../app/services';

describe('DefaultEmailGeneratorOutputProcessor Test Suite', () => {

    it('New instance should not throw', () =>
        expect(() => new DefaultEmailGeneratorOutputProcessor()).not.toThrow()
    )

    it('String array should output and not throw', () =>
        expect(() => {

            const instance = new DefaultEmailGeneratorOutputProcessor();
            const mockOutputs = [
                'Sample a',
                'Sample b'
            ]

            instance.processEmailGeneratorOutputs(mockOutputs)

        }).not.toThrow()
    )

    it('String should output and not throw', () =>
        expect(() => {

            const instance = new DefaultEmailGeneratorOutputProcessor();
            const mockOutputs = 'Sample a';

            instance.processEmailGeneratorOutputs(mockOutputs)

        }).not.toThrow()
    )

});