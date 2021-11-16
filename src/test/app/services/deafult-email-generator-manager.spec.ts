import 'reflect-metadata';

import { DefaultEmailGeneratorManager } from '../../../app/services';
import { DependencyInjection } from '../../../app/internal';

describe('DefaultEmailGeneratorManager Test Suite', () => {
    beforeAll(() => {
        DependencyInjection.configureServices();
    });

    afterAll(() => {
        const container = DependencyInjection.serviceProvider();
        container.reset();
    });

    test('New instance should not throw', () =>
        expect(() => {
            DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorManager>(
                'EmailGeneratorManagerBase'
            );
        }).not.toThrow());
});
