import { DependencyInjection } from '../../../app/internal';
import { DefaultEmailGeneratorOptionsProvider } from '../../../app/services';
import mockArgv from '../../mock-argv';

describe('DefaultEmailGeneratorOptionsProvider Test Suite', () => {

    beforeAll(() => {
        DependencyInjection.configureServices();
    });

    afterAll(() => {
        const container = DependencyInjection.serviceProvider();
        container.reset();
    });

    it('New instance should not throw', () =>
        expect(() => DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>('IEmailGeneratorOptionsProvider')).not.toThrow()
    )

    it('Missing required and no cli arguments should throw', async () => {
        await mockArgv([], () => {
            const instance = DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>('IEmailGeneratorOptionsProvider');
            expect(() => instance.testGetEmailGeneratorOptions()).toThrow()
        })
    })

    it('Unsupported cli arguments should not throw', () => {
        mockArgv(['-t', 'test', '-f', 'unsupported'], () => {
            const instance = DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>('IEmailGeneratorOptionsProvider');
            expect(() => instance.testGetEmailGeneratorOptions()).not.toThrow();
        })
    })

    it('Required cli arguments should not throw', () => {
        mockArgv(['-t', 'unsupportedArg'], () => {
            const instance = DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>('IEmailGeneratorOptionsProvider');
            expect(() => instance.testGetEmailGeneratorOptions()).not.toThrow()
        })
    })

});