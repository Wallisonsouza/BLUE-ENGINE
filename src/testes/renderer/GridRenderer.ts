// import Renderer from "../base/base_renderer";
// import Color from "../static/color";
// import RectTransform from "../extension/rect";
// import Camera from "../extension/Camera";

// export default class GridRenderer extends Renderer {

//     public override color: Color = Color.white;
//     public lineWidth: number = 1;
    
//     public override render(ctx: CanvasRenderingContext2D, camera: Camera, transfom: RectTransform): void {
//         // ctx.save();
    
//         // ctx.strokeStyle = `${this.color}`;
//         // ctx.lineWidth = this.lineWidth;
    
//         // const centerX = ctx.canvas.width / 2 + camera.zoom;
//         // const centerY = ctx.canvas.height / 2 + camera.zoom;
    
//         // // Desenha linhas verticais
//         // for(let x = 0; x <= ctx.canvas.width / 2 + camera.zoom; x += transfom.size.x) {
//         //     ctx.beginPath();
//         //     // Linha para a direita do centro ajustado
//         //     ctx.moveTo(centerX + x, 0);
//         //     ctx.lineTo(centerX + x, ctx.canvas.height);
//         //     ctx.stroke();
    
//         //     // Linha para a esquerda do centro ajustado
//         //     if(x !== 0) { // Evita desenhar a linha do centro duas vezes
//         //         ctx.beginPath();
//         //         ctx.moveTo(centerX - x, 0);
//         //         ctx.lineTo(centerX - x, ctx.canvas.height);
//         //         ctx.stroke();
//         //     }
//         // }
    
//         // // Desenha linhas horizontais
//         // for(let y = 0; y <= ctx.canvas.height / 2+ camera.zoom; y += transfom.size.y) {
//         //     ctx.beginPath();
          
//         //     // Linha para baixo do centro ajustado
//         //     ctx.moveTo(0, centerY + y);
//         //     ctx.lineTo(ctx.canvas.width, centerY + y );
//         //     ctx.stroke();
    

//         //     // Linha para cima do centro ajustado
//         //     if(y !== 0) { // Evita desenhar a linha do centro duas vezes
//         //         ctx.beginPath();
//         //         ctx.moveTo(0, centerY - y);
//         //         ctx.lineTo(ctx.canvas.width, centerY - y);
//         //         ctx.stroke();
//         //     }
//         // }
    
//         // ctx.restore();
//     }
// }