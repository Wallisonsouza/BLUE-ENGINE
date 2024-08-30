import Scrypt from "../components/base_mono";

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

    public static async loadResources(): Promise<void> {
        try {
            const loadPromises = this.scrypts.map(scrypt => scrypt.loadResources());
            await Promise.all(loadPromises);
            
            console.log('Todos os recursos foram carregados com sucesso.');
        } catch (error) {
            console.error('Erro ao carregar recursos:', error);
            throw error;
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