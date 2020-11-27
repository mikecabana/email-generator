import { container, DependencyContainer } from 'tsyringe';
import { EmailGeneratorManagerBase, IEmailGeneratorOptionsProvider, IEmailGeneratorOutputProcessor, IEmailGeneratorPipelineProcessor } from '../../abstraction';
import { DefaultEmailGeneratorOptionsProvider } from '../services';
import { DefaultEmailGeneratorManager } from '../services/default-email-generator-manager.class';
import { DefaultEmailGeneratorOutputProcessor } from '../services/default-email-generator-output-processor.class';
import { DefaultEmailGeneratorPipelineProcessor } from '../services/default-email-generator-pipeline.processor.class';

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
        container
            .register<IEmailGeneratorOptionsProvider>('IEmailGeneratorOptionsProvider', { useClass: DefaultEmailGeneratorOptionsProvider });

        // processors
        container
            .register<IEmailGeneratorPipelineProcessor>('IEmailGeneratorPipelineProcessor', { useClass: DefaultEmailGeneratorPipelineProcessor })
            .register<IEmailGeneratorOutputProcessor>('IEmailGeneratorOutputProcessor', { useClass: DefaultEmailGeneratorOutputProcessor });

        // handlers
        // ToDo
        
        // manager
        container
            .register<EmailGeneratorManagerBase>('EmailGeneratorManagerBase', { useClass: DefaultEmailGeneratorManager });
    }
}