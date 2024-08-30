import Color from "../../static/color";
import Vec2 from "../Math/vec2";
import Shader from "./Shader";

export default class Material {
    public color: Color = Color.white;  
    public shader: Shader = new Shader(); 
    public texture: WebGLTexture | null = null; 
    public lineColor: Color = Color.black;  
    public tiling: Vec2 = new Vec2(1, 1);

    constructor(
        color: Color = Color.white,
        shader: Shader = new Shader(),
        texture: WebGLTexture | null = null,
        lineColor: Color = Color.black
    ) {
        this.color = color;
        this.shader = shader;
        this.texture = texture;
        this.lineColor = lineColor;
    }
}

export function createTexture(gl: WebGLRenderingContext, imageUrl: string): WebGLTexture | null {
    // Cria a textura
    const texture = gl.createTexture();
    if (!texture) {
        console.error("Não foi possível criar a textura.");
        return null;
    }

    // Vincula a textura para configuração
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Define os parâmetros de filtro e envolvimento da textura
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Cria uma textura temporária com uma cor sólida (para evitar problemas enquanto a imagem carrega)
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const pixels = new Uint8Array([0, 0, 0, 255]);  // Preto
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, pixels);

    // Carrega a imagem e atualiza a textura
    const image = new Image();
    image.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, image);

        // Se a textura é de tamanho não-potência de 2, não gere mipmaps
        if (image.width % 2 === 0 && image.height % 2 === 0) {
            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        // Redefine os parâmetros de filtro e envolvimento após o carregamento da imagem
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    image.src = imageUrl;

    return texture;
}
