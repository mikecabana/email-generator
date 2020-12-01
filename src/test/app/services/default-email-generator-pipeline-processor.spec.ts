import { IEmailGeneratorOptions } from '../../../abstraction';
import { DefaultEmailGeneratorPipelineProcessor } from '../../../app/services';
import { DependencyInjection } from '../../../app/internal';

describe('DefaultEmailGeneratorPipelineProcessor Test Suite', () => {

    it('New instance should not throw', () =>
        expect(() => {
            DependencyInjection.configureServices();
            // return new instance
            DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorPipelineProcessor>('IEmailGeneratorPipelineProcessor');

        }).not.toThrow()
    )

    it('Using options should not throw', () =>
        expect(() => {

            DependencyInjection.configureServices();
            // return new instance
            const instance = DependencyInjection.serviceProvider().resolve<DefaultEmailGeneratorPipelineProcessor>('IEmailGeneratorPipelineProcessor');
            const mockOptions: IEmailGeneratorOptions = {
                $0: '',
                _: [],
                t: 'sample',
                e: []
            }

            instance.processEmailGeneratorPipeline(mockOptions)

        }).not.toThrow()
    )

});