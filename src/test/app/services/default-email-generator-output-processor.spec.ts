import { DependencyInjection } from '../../../app/internal';
import { DefaultEmailGeneratorOutputProcessor } from '../../../app/services';

describe('DefaultEmailGeneratorOutputProcessor Test Suite', () => {

    beforeAll(() => {
        DependencyInjection.configureServices();
    });

    afterAll(() => {
        const container = DependencyInjection.serviceProvider();
        container.reset();
    });

    it('New instance should not throw', () =>
        expect(() => DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOutputProcessor>('IEmailGeneratorOutputProcessor')).not.toThrow()
    )

    it('String array should output and not throw', () =>
        expect(() => {

            const instance = DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOutputProcessor>('IEmailGeneratorOutputProcessor');
            const mockOutputs = [
                'Sample a',
                'Sample b'
            ]

            instance.processEmailGeneratorOutputs(mockOutputs)

        }).not.toThrow()
    )

    it('String should output and not throw', () =>
        expect(() => {

            const instance = DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOutputProcessor>('IEmailGeneratorOutputProcessor');
            const mockOutputs = 'Sample a';

            instance.processEmailGeneratorOutputs(mockOutputs)

        }).not.toThrow()
    )

});