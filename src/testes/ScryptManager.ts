import Scrypt from "./engine/base_mono";

export class ScryptManager {

    public static logics: Scrypt[] = [];

    public static addNewScrypt(logic: Scrypt): void {
        if(logic instanceof Scrypt && !this.logics.includes(logic)) {
            this.logics.push(logic);
        }

        console.log('Scrypt added');
    }
}