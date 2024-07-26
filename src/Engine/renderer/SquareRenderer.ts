import Renderer from "../engine/base_renderer";
import Camera from "../components/Camera";
import Drawn from "../components/Drawn";


export default class SquareRenderer extends Renderer {
  
    public borderRadius:{lt: number, lb: number, rt: number, rb: number} =  {
        lb: 100,
        lt: 100,
        rb: 100,
        rt: 100
    }

    override render(_ctx: CanvasRenderingContext2D, _camera: Camera): void {

        
        Drawn.drawnRect(
            _ctx,
            this.rect.rotatedPosition.x,
            this.rect.rotatedPosition.y,
            this.rect.width,
            this.rect.height,
            this.rect.originX,
            this.rect.originY,
            this.rect.rotation,
            this.fillColor,
           this.rect.borderRadius
        );

       
    }
}