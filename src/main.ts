import 'reflect-metadata';
import { EmailGeneratorManagerBase } from './abstraction';

import { DependencyInjection } from './app/internal'
// import { DefaultEmailGeneratorManager } from './app/services';

class Program {
    public main() {
        DependencyInjection.configureServices();

        const emailGeneratorManager = DependencyInjection.serviceProvider().resolve<EmailGeneratorManagerBase>('EmailGeneratorManagerBase');
        emailGeneratorManager.init();
    }
}

const program = new Program();
program.main();
