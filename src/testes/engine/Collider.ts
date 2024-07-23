import Color from "../Obsolet/color";
import Vector2 from "../../vector2";
import Component from "./base_component";
import Camera from "../components/Camera";
import Transform from "../components/Transform";

export default class Collider extends Component {

    public offset: Vector2 = new Vector2(0, 0);
    public fillColor: string = "rgba(0, 0, 255, 0.5)";
    public strokeColor: string = "transparent";
    public lineWidth: number = 2;
    public id = Math.random().toString(36).substr(2, 9);
    public actived = true;

    public drawnCollider(_ctx: CanvasRenderingContext2D, _camera: Camera, _rect: Transform): void {}
    public collisionPoint(_camera: Camera, _pointPosition: Vector2): boolean {return false;}
    public checkCollision(_rect: Transform, _x: number, _y: number): boolean {return false;}
}
