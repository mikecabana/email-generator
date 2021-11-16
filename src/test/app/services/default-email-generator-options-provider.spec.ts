import 'reflect-metadata';

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

    test('New instance should not throw', () =>
        expect(() =>
            DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>(
                'IEmailGeneratorOptionsProvider'
            )
        ).not.toThrow());

    test('Missing required and no cli arguments should throw', async () => {
        await mockArgv([], () => {
            const instance =
                DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>(
                    'IEmailGeneratorOptionsProvider'
                );
            expect(() => instance.testGetEmailGeneratorOptions()).toThrow();
        });
    });

    test('Unsupported cli arguments should not throw', () => {
        mockArgv(['-t', 'test', '-f', 'unsupported'], () => {
            const instance =
                DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>(
                    'IEmailGeneratorOptionsProvider'
                );
            expect(() => instance.testGetEmailGeneratorOptions()).not.toThrow();
        });
    });

    test('Required cli arguments should not throw', () => {
        mockArgv(['-t', 'unsupportedArg'], () => {
            const instance =
                DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOptionsProvider>(
                    'IEmailGeneratorOptionsProvider'
                );
            expect(() => instance.testGetEmailGeneratorOptions()).not.toThrow();
        });
    });
});
