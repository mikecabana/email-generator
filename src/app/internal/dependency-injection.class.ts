import { container, DependencyContainer } from 'tsyringe';
import { EmailGeneratorManagerBase, IEmailGeneratorArgumentProvider } from '../../abstraction';
import { DefaultEmailGeneratorArgumentProvider } from '../services';

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

        container.register<IEmailGeneratorArgumentProvider>('DefaultEmailGeneratorArgumentProvider', { useClass: DefaultEmailGeneratorArgumentProvider })

        container.register<EmailGeneratorManagerBase>('EmailGeneratorManagerBase', { useClass: EmailGeneratorManagerBase });
    }
}