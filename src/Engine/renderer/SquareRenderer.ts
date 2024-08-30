// import Renderer from "../engine/base_renderer";
// import Camera from "../components/Camera";
// import Draw from "../components/Draw";


// export default class SquareRenderer extends Renderer {
  
//     public borderRadius:{lt: number, lb: number, rt: number, rb: number} =  {
//         lb: 20,
//         lt: 20,
//         rb: 20,
//         rt: 20
//     }

//     override render(_ctx: CanvasRenderingContext2D): void {
//         // Draw.drawRect(
//         //     _ctx,
//         //     this.rect.width,
//         //     this.rect.height,
//         //     this.fillColor,
//         //     this.borderRadius
//         // );
//         Draw.drawPath(_ctx, this.rect.getPath())
//     }

//     override toString(){
//       return `SquareRenderer`
//     }
// }