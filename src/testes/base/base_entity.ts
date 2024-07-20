export default class Entity {
    
    public id: number;
    private static lastId: number = 0;

    private static generateId(): number {
        return ++Entity.lastId;
    }

    constructor() {
        this.id = Entity.generateId();
    }
}