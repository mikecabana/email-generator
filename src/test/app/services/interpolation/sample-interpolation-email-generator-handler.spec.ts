import { IEmailGeneratorHandler } from "../../../../abstraction/services/handlers";
import { DependencyInjection } from "../../../../app/internal";
import { DefaultTranspilationEmailGeneratorHandler } from "../../../../app/services/handlers/transpilation";

describe('DefaultTranspilationEmailGeneratorHandler Test Suite', () => {

    beforeAll(() => {
        DependencyInjection.configureServices();
    });

    afterAll(() => {
        const container = DependencyInjection.serviceProvider();
        container.reset();
    });

    it('New instance should not throw', () =>
        expect(() => {
            DependencyInjection.serviceProvider().resolveAll<IEmailGeneratorHandler>('IEmailGeneratorHandler')
        }).not.toThrow()
    )

    it('There should be 1 instance', () => {
        const handlers = DependencyInjection.serviceProvider().resolveAll<IEmailGeneratorHandler>('IEmailGeneratorHandler');
        const filtered = handlers.filter(h => h instanceof DefaultTranspilationEmailGeneratorHandler);
        expect(filtered).toHaveSize(1);
    })

});