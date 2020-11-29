import { DefaultEmailGeneratorManager } from '../../../app/services';

import { DependencyInjection } from '../../../app/internal';

describe('DefaultEmailGeneratorManager Test Suite', () => {

    it('New instance should not throw', () =>
        expect(() => {
            DependencyInjection.configureServices();
            // return new instance
            DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorManager>('EmailGeneratorManagerBase');
        }).not.toThrow()
    )

});