import 'reflect-metadata';

import { DependencyInjection } from './app/internal'
import { EmailGeneratorManager } from './abstraction';

class Program {
    public main(...args: unknown[]) {
        DependencyInjection.configureServices();

        const emailGeneratorManager = DependencyInjection.serviceProvider().resolve<EmailGeneratorManager>('EmailGeneratorManager');
        emailGeneratorManager.init(...args);
    }
}

const program = new Program();
program.main(...process.argv.slice(2));
