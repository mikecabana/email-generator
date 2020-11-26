import { inject } from "tsyringe";
import { EmailGeneratorManagerBase } from "../../abstraction";

export class DefaultEmailGeneratorManager extends EmailGeneratorManagerBase {
    constructor(){
        super(
            @inject('')
        );
    }
}