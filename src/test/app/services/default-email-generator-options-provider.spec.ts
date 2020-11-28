import { DefaultEmailGeneratorOptionsProvider } from '../../../app/services';
import mockArgv from '../../mock-argv';

describe('DefaultEmailGeneratorOptionsProvider Test Suite', () => {

    it('New instance should not throw', () => {
        expect(new DefaultEmailGeneratorOptionsProvider()).not.toThrow()
    })

    it('Missing required or no cli arguments should throw', () => {
        const instance = new DefaultEmailGeneratorOptionsProvider();
        mockArgv([], () => expect(instance.getEmailGeneratorOptions()).toThrow())
    })

    it('Unsupported cli arguments should not throw', () => {
        const instance = new DefaultEmailGeneratorOptionsProvider();
        mockArgv(['-t', 'test', '-f', 'unsupported'], () => expect(instance.getEmailGeneratorOptions()).not.toThrow())
    })

    it('Required cli arguments should not throw', () => {
        const instance = new DefaultEmailGeneratorOptionsProvider();
        mockArgv(['-t', 'unsupportedArg'], () => expect(instance.getEmailGeneratorOptions()).not.toThrow())
    })

});