import 'reflect-metadata';

import { DependencyInjection } from './internal'
import { ArgumentManager } from './services/argument-manager.class';

class Program {
    public main(...args: unknown[]) {
        DependencyInjection.configureServices();

        const argManager = DependencyInjection.serviceProvider().resolve<ArgumentManager>('ArgumentManager');
        argManager.init(...args);
    }
}

const program = new Program();
program.main(...process.argv.slice(2));
