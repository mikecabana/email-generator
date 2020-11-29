import { DefaultEmailGeneratorOptionsProvider } from '../../../app/services';
import mockArgv from '../../mock-argv';

describe('DefaultEmailGeneratorOptionsProvider Test Suite', () => {

    it('New instance should not throw', () =>
        expect(() => new DefaultEmailGeneratorOptionsProvider()).not.toThrow()
    )

    it('Missing required and no cli arguments should throw', async () => {
        await mockArgv([], () => {
            const instance = new DefaultEmailGeneratorOptionsProvider();
            expect(() => instance.testGetEmailGeneratorOptions()).toThrow()
        })
    })

    it('Unsupported cli arguments should not throw', () => {
        mockArgv(['-t', 'test', '-f', 'unsupported'], () => {
            const instance = new DefaultEmailGeneratorOptionsProvider();
            expect(() => instance.testGetEmailGeneratorOptions()).not.toThrow();
        })
    })

    it('Required cli arguments should not throw', () => {
        mockArgv(['-t', 'unsupportedArg'], () => {
            const instance = new DefaultEmailGeneratorOptionsProvider();
            expect(() => instance.testGetEmailGeneratorOptions()).not.toThrow()
        })
    })

});