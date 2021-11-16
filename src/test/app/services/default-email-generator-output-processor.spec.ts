import 'reflect-metadata';

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

    test('New instance should not throw', () =>
        expect(() =>
            DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOutputProcessor>(
                'IEmailGeneratorOutputProcessor'
            )
        ).not.toThrow());

    test('String array should output and not throw', () =>
        expect(() => {
            const instance =
                DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOutputProcessor>(
                    'IEmailGeneratorOutputProcessor'
                );
            const mockOutputs = [
                '\nSample string in array at index 0',
                '\nSample string in array at index 1'
            ];

            instance.processEmailGeneratorOutputs(mockOutputs);
        }).not.toThrow());

    test('String should output and not throw', () =>
        expect(() => {
            const instance =
                DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorOutputProcessor>(
                    'IEmailGeneratorOutputProcessor'
                );
            const mockOutputs = '\nSample string';

            instance.processEmailGeneratorOutputs(mockOutputs);
        }).not.toThrow());
});
