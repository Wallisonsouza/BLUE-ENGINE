import Color from "../../static/color";
import Vec2 from "../Math/Vec2";
import { Shader } from "../../../Shader/Shader";
import EngineCache from "../../Cache/EngineCache";
import { MaterialUtil } from "../../static/Util";


export class Material {
    
    public shader: Shader = new Shader();
    public color: Color = Color.white; 
    public texture: WebGLTexture | null = null;
    public tiling: Vec2 = Vec2.one;
    public offset: Vec2 = Vec2.zero;

    public setTexture(src: string) {
        MaterialUtil.setTexture(this.texture, src);
    }

    public setTiling(value: Vec2){
        this.tiling = value;
    }

    public setOffset(value: Vec2){
        this.offset = value;
    }
}

export default class Material3D extends Material {
    public color: Color = Color.white;
    public shader: Shader = new Shader();
    public albedo: WebGLTexture | null = null;
    public normalMap: WebGLTexture | null = null;
    public lineColor: Color = Color.white;
    public tiling: Vec2 = new Vec2(1, 1);
    public offset: Vec2 = new Vec2(0, 0);

    private colorHtml = document.getElementById("color");

    constructor(
        color: Color = Color.white,
        shader: Shader = new Shader(),
        texture: WebGLTexture | null = null,
        lineColor: Color = Color.white
    ) {

        super();
        this.color = color;
        this.shader = shader;
        this.shader.compile();
        this.albedo = texture;
        this.lineColor = lineColor;
        
        if (this.colorHtml) {
            this.colorHtml.oninput = (e: Event) => {
                
                const target = e.target as HTMLInputElement | null;
                if (target && target.type === 'color') {
                    const colorHex = target.value; 
                    this.color = Color.hexToRGBA(colorHex);
                }
        
            };
        }
        
    }

    setAlbedo(imageUrl: string): void {

        const gl = EngineCache.gl;
        const newTexture = this.createTexture(gl, imageUrl);
        if (newTexture) {
            if (this.albedo) {
                gl.deleteTexture(this.albedo); 
            }
            this.albedo = newTexture;
        }
    }

    setNormalMap(imageUrl: string){
        const gl = EngineCache.gl;
        const newTexture = this.createTexture(gl, imageUrl);
        if (newTexture) {
            if (this.normalMap) {
                gl.deleteTexture(this.normalMap); 
            }
            this.normalMap = newTexture;
        }
    }

     /**
     * Desvincula a textura atual do contexto WebGL.
     * @param gl - O contexto WebGL.
     */
     public unbindTextures(gl: WebGLRenderingContext): void {
        if (this.albedo !== null) {
            gl.bindTexture(gl.TEXTURE_2D, null); 
        }
        
        if(this.normalMap !== null){
            gl.bindTexture(gl.TEXTURE_2D, null); 
        }
    }

    /**
     * Vincula a textura ao contexto WebGL.
     * @param gl - O contexto WebGL.
     */
    public bindTexture(gl: WebGLRenderingContext): void {
        if (this.albedo) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.albedo); 
        } else {
            console.warn("Nenhuma textura para vincular.");
        }

        if(this.normalMap){
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.normalMap); 
        }
    }

    setTiling(tiling: Vec2): void {
        this.tiling = tiling;
    }

    setOffset(offset: Vec2): void {
        this.offset = offset;
    }

    private createTexture(gl: WebGLRenderingContext, imageUrl: string): WebGLTexture | null {
        const texture = gl.createTexture();
        if (!texture) {
            console.error("Não foi possível criar a textura.");
            return null;
        }
        
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        // Usar linear para MAG_FILTER e trilinear para MIN_FILTER
       // Definindo os parâmetros de filtragem e de envolvimento da textura
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); // Filtragem bilinear com mipmaps
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST_MIPMAP_NEAREST); // Filtragem bilinear para ampliação
       
        
        // Carrega uma textura temporária
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        const pixels = new Uint8Array([0, 0, 255, 255]); // Textura sólida inicial
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, pixels);
        
        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, image);
            
            // Verifica se a imagem é de potência de dois
            if (this.isPowerOfTwo(image.width) && this.isPowerOfTwo(image.height)) {
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
        };
        
        image.onerror = () => {
            console.error(`Erro ao carregar a imagem: ${imageUrl}`);
        };
        
        image.src = imageUrl;
    
        // Retorna a textura imediatamente, mesmo que a imagem não esteja carregada ainda
        return texture;
    }
    
    private isPowerOfTwo(value: number): boolean {
        return (value & (value - 1)) === 0;
    }
}

export class Material2D extends Material {
   
}