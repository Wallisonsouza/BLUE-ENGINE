import Component from "../components/Component";
import { Material2D } from "../Core/Inplementations/Material";
import Renderer from "./Renderer";

export default class SpriteRenderer extends Renderer {
    public material2D: Material2D = new Material2D;
}

export class Texture2D {
    private gl: WebGL2RenderingContext;
    private texture: WebGLTexture | null = null;
    private width: number = 0;
    private height: number = 0;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.texture = this.gl.createTexture();
    }

    public loadFromPath(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = path;
            image.onload = () => {
                this.loadFromImage(image);
                resolve();
            };
            image.onerror = (err) => {
                console.error(`Failed to load texture from path: ${path}`, err);
                reject(err);
            };
        });
    }

    // Método para carregar a textura a partir de uma imagem
    private loadFromImage(image: HTMLImageElement) {
        if (!this.texture) {
            console.error("Failed to create WebGL texture.");
            return;
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            image
        );

        this.gl.generateMipmap(this.gl.TEXTURE_2D);

        this.width = image.width;
        this.height = image.height;

        // Configurar parâmetros de textura
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    // Método para bind da textura
    public bind(slot: number = 0) {
        if (!this.texture) {
            console.error("No texture to bind.");
            return;
        }

        this.gl.activeTexture(this.gl.TEXTURE0 + slot);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    // Método para desativar o bind da textura
    public unbind() {
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }

    public getTexture(): WebGLTexture | null {
        return this.texture;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }
}


export class Sprite {

}