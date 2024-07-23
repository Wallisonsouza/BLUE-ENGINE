import GameObject from "./GameObject";

export default class Cache {
    private static _cache: Map<string, any> = new Map();
    public static add(key: string, value: any): void {
        this._cache.set(key, value);
    }
    public static get(key: string): any {
        return this._cache.get(key);
    }
    public static remove(key: string): void {
        this._cache.delete(key);
    }
    public static clear(): void {
        this._cache.clear();
    }
}


export class GameObjectCache extends Cache {
    public static add(key: string, value: GameObject): void {
        super.add(key, value);
    }
    public static get(key: string): GameObject {
        return super.get(key);
    }
    public static remove(key: string): void {
        super.remove(key);
    }
    public static clear(): void {
        super.clear();
    }
}