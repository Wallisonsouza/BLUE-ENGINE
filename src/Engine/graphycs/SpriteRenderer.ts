import Mesh from "./Mesh";
import Camera from "../Core/Inplementations/Camera";
import Transform from "../Core/Inplementations/Transform";
import { Material2D } from "../Core/Inplementations/Material";
import Renderer from "./Renderer";
import MeshBuilder from "./MeshBuilder";

export default class SpriteRenderer extends Renderer {

    public transform: Transform = new Transform();
    public sprite: Sprite | null = null;
    public material: Material2D | null = null;
    public renderMode: RenderMode = RenderMode.SOLID;
    private gl: WebGL2RenderingContext = Renderer.wegl2;
    

    public render(): void {
        this.renderScene();
        this.transform.drawGizmos();
    }
    
    private renderScene() {
        const camera = Camera.currentCamera;

        if (!camera || !this.sprite || !this.material) return;
    
        // Configure o shader da cena
        this.material.shader.use();
      
        // Defina as propriedades e as matrizes no shader
        const projection = camera.getProjectionMatrix();
        const view = camera.getViewMatrix();
        const model = this.transform.getModelMatrix();
    
        this.material.shader.setUniformMatrix4fv("uModel", model);
        this.material.shader.setUniformMatrix4fv("uView", view);
        this.material.shader.setUniformMatrix4fv("uProjection", projection);
    
        // Configure os buffers e atributos
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite.mesh.vertexBuffer);
        this.material.shader.enableAttribute3f(this.gl, "aPosition");
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite.mesh.UVBuffer);
        this.material.shader.enableAttribute2f(this.gl, "aTexCoord");
   
        if (this.material.texture) {
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.material.texture);
            this.material.shader.setUniform1i("uTexture", 0);
        } 
    
        const [x, y, z, w] = this.material.color.toVec4();
        this.material.shader.setUniform4f("uColor", x, y, z, w);

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.sprite.mesh.indexBuffer);
        
        this.gl.drawElements(this.gl.TRIANGLES, this.sprite.mesh.triangles.length, this.gl.UNSIGNED_SHORT, 0);
    
        // Limpeza
        this.material.shader.disableAttribute(this.gl, "aPosition");
        this.material.shader.disableAttribute(this.gl, "aTexCoord");
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    }
}

export class Sprite {
    public mesh: Mesh;
    constructor(){
        this.mesh = MeshBuilder.createSquare();
        this.mesh.compile();
    }
}

/**
 * Enum para representar os modos de renderização.
 */
export enum RenderMode {
    TEXTURED = "TEXTURED",
    SOLID = "SOLID",
    WIREFRAME = "WIREFRAME",
    SHADED = "SHADED",
    ADVANCED = "ADVANCED",
    SOLID_WIRE = "SOLIDWIRE"
}
