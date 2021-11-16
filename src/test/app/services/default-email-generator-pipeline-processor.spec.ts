import 'reflect-metadata';

import { IEmailGeneratorOptions } from '../../../abstraction';
import { DefaultEmailGeneratorPipelineProcessor } from '../../../app/services';
import { DependencyInjection } from '../../../app/internal';

describe('DefaultEmailGeneratorPipelineProcessor Test Suite', () => {
    beforeAll(() => {
        DependencyInjection.configureServices();
    });

    afterAll(() => {
        const container = DependencyInjection.serviceProvider();
        container.reset();
    });

    test('New instance should not throw', () =>
        expect(() => {
            DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorPipelineProcessor>(
                'IEmailGeneratorPipelineProcessor'
            );
        }).not.toThrow());

    test('Using options should not throw', () =>
        expect(() => {
            const instance =
                DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorPipelineProcessor>(
                    'IEmailGeneratorPipelineProcessor'
                );
            const mockOptions: IEmailGeneratorOptions = {
                $0: '',
                _: [],
                t: 'sample',
                e: []
            };

            instance.processEmailGeneratorPipeline(mockOptions);
        }).not.toThrow());
});
