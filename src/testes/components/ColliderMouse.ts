import Vector2 from "../../vector2";
import Collider from "../engine/Collider";
import Camera from "./Camera";
import Collision from "./Collision";
import Drawn from "./Drawn";
import Transform from "./Transform";

export default class MouseCollider extends Collider {
    public override checkCollision(rect: Transform, x: number, y: number): boolean {
        return Collision.rectanglePoint(new Vector2(x, y), rect.getRotatedPosition(), rect.getRadians(), rect.size );
    }

    public override drawnCollider(_ctx: CanvasRenderingContext2D, _camera: Camera, transform: Transform): void {
        Drawn.drawnWireRect(
            _ctx,
            transform.getRotatedPosition(),
            transform.getRadians(),
            transform.size,
            this.lineWidth,
            this.strokeColor
        );
    }   
}