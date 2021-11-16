import 'reflect-metadata';

import { IEmailGeneratorHandler } from '../../../../abstraction/services/handlers';
import { DependencyInjection } from '../../../../app/internal';
import { DefaultSenderEmailGeneratorHandler } from '../../../../app/services/handlers/send';

describe('DefaultSenderEmailGeneratorHandler Test Suite', () => {
    beforeAll(() => {
        DependencyInjection.configureServices();
    });

    afterAll(() => {
        const container = DependencyInjection.serviceProvider();
        container.reset();
    });

    test('New instance should not throw', () =>
        expect(() => {
            DependencyInjection.serviceProvider().resolveAll<IEmailGeneratorHandler>(
                'IEmailGeneratorHandler'
            );
        }).not.toThrow());

    test('There should be 1 instance', () => {
        const handlers =
            DependencyInjection.serviceProvider().resolveAll<IEmailGeneratorHandler>(
                'IEmailGeneratorHandler'
            );
        const filtered = handlers.filter(
            (h) => h instanceof DefaultSenderEmailGeneratorHandler
        );
        expect(filtered).toHaveLength(1);
    });
});
