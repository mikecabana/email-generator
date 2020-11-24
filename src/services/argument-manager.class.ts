
import { injectable } from 'tsyringe';

@injectable()
export class ArgumentManager {

    public init(...args: unknown[]): void {
        console.log('Hello World!', args);
    }
}