import Vector2 from "../../vector2";
import Collider from "../base/Collider";
import Camera from "./Camera";
import Collision from "./Collision";
import Drawn from "./Drawn";
import Transform from "./Transform";

export default class MouseBorderCollider extends Collider {
    
    public border: Border = Border.none;
    constructor(){
        super();
        this.strokeColor = "orange";
        this.lineWidth = 5;
    }
    public override checkCollision(rect: Transform, x: number, y: number): boolean {

        const collision = Collision.borderPoint(
          
            new Vector2(x, y), rect.getAdjustedPosition(), rect.rotation, rect.size
        );

        this.border = collision.border;
        return collision.result;
    }

    public override drawnCollider(_ctx: CanvasRenderingContext2D, _camera: Camera, transform: Transform): void {
        Drawn.drawnWireRect(
            _ctx,
            transform.getAdjustedPosition(),
            transform.rotation,
            transform.size,
            this.lineWidth,
            this.strokeColor
        );
    }   

}


export enum Border {
    none,
    inBorderLeft,
    inBorderRight,
    inBorderTop,
    inBorderBottom,
}