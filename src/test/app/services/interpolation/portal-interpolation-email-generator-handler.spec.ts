import 'reflect-metadata';

import { IEmailGeneratorHandler } from '../../../../abstraction/services/handlers';
import { DependencyInjection } from '../../../../app/internal';
import { PortalInterpolationEmailGeneratorHandler } from '../../../../app/services/handlers/interpolation';

describe('DefaultTranspilationEmailGeneratorHandler Test Suite', () => {
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
            (h) => h instanceof PortalInterpolationEmailGeneratorHandler
        );
        expect(filtered).toHaveLength(1);
    });
});
