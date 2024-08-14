import GameObject from "../components/GameObject";
import Entity from "../engine/Entity";
import LRUCache from "./LRUCache";

export default class EngineCache {
    private static entities: GameObject[] = [];
    public static setEntities(entities: GameObject[]): void {
        this.entities = entities;
    }
    public static getEntities(): GameObject[] {
        return this.entities;
    }

    public static context: CanvasRenderingContext2D;
    
    public static getContext(){
        return this.context;
    }
    //#region IMAGE CACHE

    private static imageCache: LRUCache<string, HTMLCanvasElement> = new LRUCache(500);
    public static getImageCache(key: string): HTMLCanvasElement | undefined {
        return this.imageCache.get(key);
    }
    public static setImageCache(key: string, value: HTMLCanvasElement): void {
    this.imageCache.set(key,value)
    }
    public static clearCache(): void {
        this.imageCache.clear();
    }
    public static getCacheSize(): number {
        return this.imageCache.size();
    }

    //#endregion

}