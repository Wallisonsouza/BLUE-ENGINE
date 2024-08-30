import MonoComportament from "../components/MonoComportament";

export default class ScryptManager {

    private static scrypts: MonoComportament[] = [];

    public static getScrypts(): MonoComportament[] {
        return this.scrypts;
    }
    public static addNewScrypt(scrypt: MonoComportament): void {
        if(scrypt instanceof MonoComportament && !this.scrypts.includes(scrypt)) {
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