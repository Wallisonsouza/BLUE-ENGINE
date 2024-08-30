export default class Entity {
    
    public id: string = Math.random().toString(36).substr(2, 9);;
    private static lastId: number = 0;

    private static generateId(): number {
        return ++Entity.lastId;
    }
}