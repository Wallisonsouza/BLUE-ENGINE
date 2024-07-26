import Scrypt from "../engine/base_mono";

export default class ScryptManager {

    public static scrypts: Scrypt[] = [];

    public static addNewScrypt(logic: Scrypt): void {
        if(logic instanceof Scrypt && !this.scrypts.includes(logic)) {
            this.scrypts.push(logic);
        }

        console.log('Scrypt added');
    }
}