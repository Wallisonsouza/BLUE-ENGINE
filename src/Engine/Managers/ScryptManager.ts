import Scrypt from "../engine/base_mono";

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

    public static fixedUpdate(): void {
        this.scrypts.forEach(scrypt => {scrypt.fixedUpdate();});
    }

    public static update(): void {
        this.scrypts.forEach(scrypt => {scrypt.update();});
    }

    public static lateUpdate(): void {
        this.scrypts.forEach(scrypt => {scrypt.lateUpdate();});
    }

    public static onDrawGizmos(): void {
        this.scrypts.forEach(scrypt => {scrypt.onDrawGizmos();});
    }
    public static onGUI(): void {
        this.scrypts.forEach(scrypt => {scrypt.onGUI();});
    }
}