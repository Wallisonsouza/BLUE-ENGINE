import GameObject from "../extension/GameObject";
import Collider from "./Collider";

export default class CollisionData {
    public gameObject: GameObject;
    public collider: Collider;

    constructor(gameObject: GameObject, collider: Collider) {
        this.gameObject = gameObject;
        this.collider = collider;
    }

}
    
