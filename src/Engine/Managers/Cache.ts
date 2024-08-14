import GameObject from "../components/GameObject";
import Entity from "../engine/Scrypt";

export default class EngineCache {
    private static entities: GameObject[] = [];
    public static setEntities(entities: GameObject[]): void {
        this.entities = entities;
    }
    public static getEntities(): GameObject[] {
        return this.entities;
    }

}