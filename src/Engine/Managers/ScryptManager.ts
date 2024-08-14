import Scrypt from "../engine/base_mono";
import Input from "../Input/Input";

export default class ScryptManager {

    private static scrypts: Scrypt[] = [];

    public static getScrypts(): Scrypt[] {
        return this.scrypts;
    }
    public static addNewScrypt(scrypt: Scrypt): void {
        if(scrypt instanceof Scrypt && !this.scrypts.includes(scrypt)) {
            this.scrypts.push(scrypt);
        }
    }

    public static awake(): void {
        this.scrypts.forEach(scrypt => {scrypt.awake();});
    }

    public static start(): void {
        this.scrypts.forEach(scrypt => {scrypt.start();});
    }

    public static update(deltaTime: number): void {
        this.scrypts.forEach(scrypt => {scrypt.update(deltaTime);});
    }

    public static fixedUpdate(): void {
        this.scrypts.forEach(scrypt => {scrypt.fixedUpdate();});
    }
}