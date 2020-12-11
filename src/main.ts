import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { EmailGeneratorManagerBase } from './abstraction';

import { DependencyInjection } from './app/internal'
// import { DefaultEmailGeneratorManager } from './app/services';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

class Program {
    public static main(): void {
        DependencyInjection.configureServices();

        const emailGeneratorManager = DependencyInjection.serviceProvider().resolve<EmailGeneratorManagerBase>('EmailGeneratorManagerBase');
        emailGeneratorManager.init();
    }
}

Program.main();