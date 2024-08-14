import Camera from "../components/Camera";
import Draw from "../components/Draw";
import Renderer from "../engine/base_renderer";

export default class ImageRenderer extends Renderer {
    private image: HTMLImageElement;
    private source: string = "src/Assets/Images/transferencia-de-dados.png";
    constructor() {
        super();
        this.image = new Image();
        this.image.src = this.source;
      
        this.image.onload = () => {
            this.rect.width = this.image.width;
            this.rect.height = this.image.height;
        };

        // const imageInput = document.getElementById("image-input") as HTMLInputElement;
        // imageInput.addEventListener("change", (e) => {
        //     const target = e.target as HTMLInputElement;
        //     const file = target.files?.item(0);
        //     if (file) {
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             const target = e.target as FileReader;
        //             this.setImageSource(target.result as string);
        //         };
        //         reader.readAsDataURL(file);
        //     }
        // });
    }

    public setImageSource(source: string): void {
        this.source = source; 
        this.image.src = source;
    }

    override render(_ctx: CanvasRenderingContext2D, _camera: Camera): void {
        Draw.drawImage(
            _ctx,
            this.image,
            this.rect.width,
            this.rect.height,
        );
    }
}