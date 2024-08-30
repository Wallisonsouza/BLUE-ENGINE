import Mesh from "./Mesh";
import Camera from "../Core/Inplementations/Camera";
import Transform from "../Core/Inplementations/Transform";
import Material from "../Core/Inplementations/Material";
import Renderer from "./Renderer";


export default class MeshRenderer extends Renderer {
    public transform: Transform = new Transform();
    public mesh: Mesh | null = null;
    public material: Material | null;
    public renderMode: RenderMode = RenderMode.SOLID;
    private gl: WebGL2RenderingContext = Renderer.wegl2;
    
    public setMesh(mesh: Mesh): void {
        this.mesh = mesh;
    }   

    render(): void {
        this.renderScene();
        this.transform.drawGizmos();
    }
    
    private renderScene() {
        const camera = Camera.currentCamera;

        if (!camera || !this.mesh || !this.material || !this.mesh.triangles) return;
    
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
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        this.material.shader.enableAttribute3f(this.gl, "aPosition");
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.UVBuffer);
        this.material.shader.enableAttribute2f(this.gl, "aTexCoord");
   
        if (this.material.albedo) {
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.material.albedo);
            this.material.shader.setUniform1i("uAlbedo", 0);
            this.material.shader.setUniform1i("uHasAlbedo", 1); 
        } else {
            this.material.shader.setUniform1i("uHasAlbedo", 0); 
        }
    
        if (this.material.normalMap) {
            this.gl.activeTexture(this.gl.TEXTURE1);
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.material.normalMap);
            this.material.shader.setUniform1i("uNormalMap", 1);
        }
    
        // Desenhe a cena

        const [x, y, z, w] = this.material.color.toVec4();
        this.material.shader.setUniform4f("uColor", x, y, z, w);

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
        
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.triangles.length, this.gl.UNSIGNED_SHORT, 0);
    
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


// class ShadowMap {
//     public texture: WebGLTexture | null = null;
//     private framebuffer: WebGLFramebuffer | null = null;
//     public material: Material = new Material();

//     constructor(private gl: WebGLRenderingContext, width: number, height: number) {
//         this.texture = gl.createTexture();
//         gl.bindTexture(gl.TEXTURE_2D, this.texture);
//         gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT16, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

//         this.framebuffer = gl.createFramebuffer();
//         gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
//         gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.texture, 0);
//         gl.bindFramebuffer(gl.FRAMEBUFFER, null);

//         this.setupShadowShader(this.material.shader);
//     }

//     public bind(): void {
//         this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
//     }

//     public unbind(): void {
//         this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
//     }

//     public setupShadowShader(shader: Shader): void {
//         shader.setVertSource(`
//             attribute vec4 aPosition;
//             uniform mat4 uLightMVP;
//             void main() {
//                 gl_Position = uLightMVP * aPosition;
//             }
//         `);
    
//         shader.setFragSource(`
//             // Fragment Shader para o ShadowMap
//             void main() {
//                 // Defina uma cor fixa (não usamos gl_FragDepth em WebGL 1.0)
//                 gl_FragColor = vec4(0.0);
//             }
//         `);
    
//         shader.compile();
//     }
// }
