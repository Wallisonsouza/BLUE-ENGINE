import Renderer from "../engine/base_renderer";
import Camera from "../components/Camera";
import Drawn from "../components/Drawn";


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
            this.transform,
            this.fillColor,
            this.strokeColor,
            this.lineWidth,
            this.borderRadius 
        );
    }
}