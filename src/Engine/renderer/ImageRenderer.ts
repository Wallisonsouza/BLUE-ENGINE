// import Camera from "../components/Camera";
// import Draw from "../components/Draw";
// import Renderer from "../engine/base_renderer";

// export default class ImageRenderer extends Renderer {
//     private image: HTMLImageElement;
//     private source: string = "src/Assets/Images/transferencia-de-dados.png";
//     constructor() {
//         super();
//         this.image = new Image();
//         this.image.src = this.source;
      
//         this.image.onload = () => {
//             this.rect.width = this.image.width;
//             this.rect.height = this.image.height;
//         };
//     }

//     public setImageSource(source: string): void {
//         this.source = source; 
//         this.image.src = source;
//     }

//     override render(context: CanvasRenderingContext2D): void {
//         Draw.drawImage(
//             context,
//             this.image,
//             this.rect.width,
//             this.rect.height,
//             "stretch"
//         );
//     }
// }