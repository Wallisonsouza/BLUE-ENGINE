import { version } from "uuid";
import Vector2 from "../../vector2";
import Renderer from "../base/base_renderer";
import Camera from "../extension/Camera";
import Drawn from "../extension/Drawn";


export default class SquareRenderer extends Renderer {
  
    public borderRadius:{lt: number, lb: number, rt: number, rb: number} =  {
        lb: 20,
        lt: 20,
        rb: 20,
        rt: 20
    }

    override render(_ctx: CanvasRenderingContext2D, _camera: Camera): void {

       
        Drawn.square(
            _ctx,
            this.transform.getAdjustedPosition(),
            this.transform.rotation,
            this.transform.size,
            this.fillColor,
            this.strokeColor,
            this.lineWidth,
            this.borderRadius 
        );
    }
}