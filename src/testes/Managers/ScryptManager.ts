import Scrypt from "../base/base_mono";

export default class ScriptManager {

    private static scrypt: Scrypt[] = [];
    public static addNewScrypt(scrypt: Scrypt) {
        if(scrypt instanceof Scrypt && !this.scrypt.includes(scrypt)) {
            this.scrypt.push(scrypt);
        }
        console.log('Scrypt: ' + scrypt.constructor.name + ' added');
    }

    public static getScrypts(): Scrypt[] {
        return this.scrypt;
    }
}