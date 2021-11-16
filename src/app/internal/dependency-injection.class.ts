import { container, DependencyContainer } from 'tsyringe';
import {
    EmailGeneratorManagerBase,
    IEmailGeneratorOptionsProvider,
    IEmailGeneratorOutputProcessor,
    IEmailGeneratorPipelineProcessor
} from '../../abstraction';
import { EmailGeneratorHandlerBase } from '../../abstraction/services/handlers';
import { DefaultEmailGeneratorOptionsProvider } from '../services';
import { DefaultEmailGeneratorManager } from '../services/default-email-generator-manager.class';
import { DefaultEmailGeneratorOutputProcessor } from '../services/default-email-generator-output-processor.class';
import { DefaultEmailGeneratorPipelineProcessor } from '../services/default-email-generator-pipeline-processor.class';
import {
    PortalInterpolationEmailGeneratorHandler,
    ReservationInterpolationEmailGeneratorHandler,
    SampleInterpolationEmailGeneratorHandler
} from '../services/handlers/interpolation';
import { DefaultSenderEmailGeneratorHandler } from '../services/handlers/send';
import { DefaultTranspilationEmailGeneratorHandler } from '../services/handlers/transpilation';

/**
 * Types of DI lifecycle
 * - Transient: A new instance is used at every point of injection
 * - Scoped: The same instance is used for the lifetime of a certain flow
 * - Singleton: The same instance is used app wide for every point of injection
 *
 * tsyringe uses a transient lifecycle by default when registering to a `DependencyContainer`
 *
 * @export
 * @class DependencyInjection
 */
export class DependencyInjection {
    public static serviceProvider: () => DependencyContainer = () => container;

    public static configureServices(): void {
        // providers
        container.register<IEmailGeneratorOptionsProvider>(
            'IEmailGeneratorOptionsProvider',
            { useClass: DefaultEmailGeneratorOptionsProvider }
        );

        // processors
        container
            .register<IEmailGeneratorPipelineProcessor>(
                'IEmailGeneratorPipelineProcessor',
                { useClass: DefaultEmailGeneratorPipelineProcessor }
            )
            .register<IEmailGeneratorOutputProcessor>(
                'IEmailGeneratorOutputProcessor',
                { useClass: DefaultEmailGeneratorOutputProcessor }
            );

        // handlers
        container
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', {
                useClass: SampleInterpolationEmailGeneratorHandler
            })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', {
                useClass: PortalInterpolationEmailGeneratorHandler
            })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', {
                useClass: ReservationInterpolationEmailGeneratorHandler
            })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', {
                useClass: DefaultTranspilationEmailGeneratorHandler
            })
            .register<EmailGeneratorHandlerBase>('IEmailGeneratorHandler', {
                useClass: DefaultSenderEmailGeneratorHandler
            });

        // manager
        container.register<EmailGeneratorManagerBase>(
            'EmailGeneratorManagerBase',
            { useClass: DefaultEmailGeneratorManager }
        );
    }
}
