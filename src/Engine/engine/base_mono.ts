import GameObject from "../components/GameObject";
import CollisionData from "./data_collision";

export default class Scrypt {
    public start(): void {}
    public update(_deltaTime: number): void {}
    public fixedUpdate(): void {}
    public onCollisionEnter(_data: CollisionData) {}
    public onCollisionStay(_data: CollisionData) {}
    public onCollisionExit(_data: CollisionData) {}
    public onMouseEnter(entity: GameObject) {}
    public onMouseExit(entity: GameObject) {}
    public onMouseStay(entity: GameObject) {}

}