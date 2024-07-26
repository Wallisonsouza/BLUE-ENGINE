import Camera from "../components/Camera";
import Drawn from "../components/Drawn";
import Renderer from "../engine/base_renderer";

export default class ImageRenderer extends Renderer {
    private image: HTMLImageElement;
    private source: string;
    constructor() {
        super();
        this.image = new Image();
        this.image.src = "src/Engine/renderer/transferencia-de-dados.png";
      
        this.image.onload = () => {
            this.rect.width = this.image.width;
            this.rect.height = this.image.height;
        };
    }

    public setImageSource(source: string): void {
        this.image.src = source;
        this.source = source; 
    }

    override render(_ctx: CanvasRenderingContext2D, _camera: Camera): void {
        // Drawn.drawImage(
        //     _ctx,
        //     this.image,
        //     this.rect.x,
        //     this.rect.y,
        //     this.rect.width,
        //     this.rect.height,
        //     this.rect.rotation,
        //     "fit",
        //     _camera.zoom
        // );
    }
}