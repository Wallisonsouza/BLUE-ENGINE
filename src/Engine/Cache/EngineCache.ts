import Camera from "../Core/Inplementations/Camera";
import Mesh from "../graphycs/Mesh";
import LRUCache from "./LRUCache";

export default class EngineCache {
    public static gl: WebGL2RenderingContext;
    public static meshTeste: Mesh;
    public static camera: Camera = new Camera();

    // private static entities: GameObject[] = [];
    // public static setEntities(entities: GameObject[]): void {
    //     this.entities = entities;
    // }
    // public static getEntities(): GameObject[] {
    //     return this.entities;
    // }

    // public static context: CanvasRenderingContext2D;
    
    // public static getContext(){
    //     return this.context;
    // }


    // private static imageCache: LRUCache<string, HTMLCanvasElement> = new LRUCache(500);
    // public static getImageCache(key: string): HTMLCanvasElement | undefined {
    //     return this.imageCache.get(key);
    // }
    // public static setImageCache(key: string, value: HTMLCanvasElement): void {
    // this.imageCache.set(key,value)
    // }
    // public static clearCache(): void {
    //     this.imageCache.clear();
    // }
    // public static getCacheSize(): number {
    //     return this.imageCache.size();
    // }

    // //#endregion

}