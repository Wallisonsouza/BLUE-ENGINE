import Renderer from "../engine/base_renderer";
import Camera from "../components/Camera";
import Draw from "../components/Draw";


export default class SquareRenderer extends Renderer {
  
    public borderRadius:{lt: number, lb: number, rt: number, rb: number} =  {
        lb: 20,
        lt: 20,
        rb: 20,
        rt: 20
    }

    override render(_ctx: CanvasRenderingContext2D, _camera: Camera): void {
        Draw.drawnRect(
            _ctx,
            this.rect.width,
            this.rect.height,
            this.fillColor,
            this.borderRadius
        );
    }
}