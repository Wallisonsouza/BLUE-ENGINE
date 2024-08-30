import EngineCache from "../Cache/EngineCache";
import Camera from "../Core/Inplementations/Camera";
import Material from "../Core/Inplementations/Material";
import Shader from "../Core/Inplementations/Shader";
import Transform from "../Core/Inplementations/Transform";
import { AppError } from "../Core/Error/AppError";
import { ErrorContext } from "../Core/Error/ErrorContext";
import { ErrorMessages } from "../Core/Error/ErrorMessage";
import Mat4 from "../Core/Math/Mat4";
import Mesh from "./Mesh";
import Input from "../Input/Input";
import { KeyCode } from "../Enum/KeyCode";

export default class MeshRenderer {
    public transform: Transform = new Transform();
    public mesh: Mesh | null = null;
    public material: Material | null = new Material();
    public camera: Camera | null = new Camera();
    public renderMode: RenderMode = RenderMode.SOLID;

    public setMesh(mesh: Mesh): void {
        this.mesh = mesh;
    }
    
    public render(): void {
        

        
        const context = new ErrorContext("EngineCache", "MeshRenderer", "render");
    
        // Verifica a disponibilidade do contexto WebGL
        if (!EngineCache.gl) {
            throw new AppError({
                ...context,
                message: ErrorMessages.WEBGL_NOT_AVAILABLE,
            });
        }
        
        if(!this.camera) return;
        // Verifica se a malha está definida
        if (!this.mesh) {
            throw new AppError({
                ...context,
                message: ErrorMessages.MESH_NOT_DEFINED,
            });
        }
    
        // Verifica se o material está definido
        if (!this.material) {
            throw new AppError({
                ...context,
                message: ErrorMessages.MATERIAL_NOT_DEFINED,
            });
        }
    
        // Verifica se o programa de shader está definido
        const program = this.material.shader.program;
        if (!program) {
            throw new AppError({
                ...context,
                message: "Shader program não encontrado. Verifique se o shader foi corretamente compilado e vinculado.",
            });
        }
      
        const gl = EngineCache.gl;
        gl.useProgram(program);

        // Vinculação dos buffers
        if (this.mesh.vertexBuffer && this.mesh.indexBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);
        } else {
            throw new AppError({
                ...context,
                message: "Buffers da malha não foram inicializados. Certifique-se de que a malha foi corretamente compilada.",
            });
        }

        const positionLocation = this.material.shader.getAttributeLocation('aPosition');
        if (positionLocation !== null) {
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        } else {
            throw new AppError({
                ...context,
                message: "Atributo de posição não encontrado no shader. Verifique se o atributo 'aPosition' está corretamente definido no shader.",
            });
        }

        const normalLocation = this.material.shader.getAttributeLocation('a_Normal');
        if (normalLocation !== null) {
            gl.enableVertexAttribArray(normalLocation);
            gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
        } else {
            throw new AppError({
                ...context,
                message: "Atributo de posição não encontrado no shader. Verifique se o atributo 'a_Normal' está corretamente definido no shader.",
            });
        }

        const UVLocation = this.material.shader.getAttributeLocation('aTexCoord');
        if (UVLocation !== null && this.mesh.UVBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.UVBuffer);
            gl.enableVertexAttribArray(UVLocation);
            gl.vertexAttribPointer(UVLocation, 2, gl.FLOAT, false, 0, 0);
        }

        
        if (this.material.texture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.material.texture);
            const textureLocation = this.material.shader.getUniformLocation("uTexture");
            gl.uniform1i(textureLocation, 0);  // O 0 aqui corresponde a gl.TEXTURE0
        }



        const uniformTilingLocation = this.material.shader.getUniformLocation("uTiling");
        gl.uniform2fv(uniformTilingLocation, this.material.tiling.toArray());

   
        // Definição das matrizes de transformação
        this.setUniformMatrix(gl, this.material.shader, "uTranslationMatrix", Mat4.translate(this.transform.position), "tradução", context);
        this.setUniformMatrix(gl, this.material.shader, "uRotationMatrix", Mat4.rotate(this.transform.rotation), "rotação", context);
        this.setUniformMatrix(gl, this.material.shader, "uScaleMatrix", Mat4.scale(this.transform.scale), "escala", context);
        this.setUniformMatrix(gl, this.material.shader, "u_view", this.camera.getViewMatrix(), "view", context);
        this.setUniformMatrix(gl, this.material.shader, "u_projection", this.camera.getProjectionMatrix(), "projeção", context);

        // Configuração do modo de renderização
        switch (this.renderMode) {
            case RenderMode.SOLID:
                gl.uniform4fv(this.material.shader.getUniformLocation("uColor"), this.material.color.toVec4());
                gl.disable(gl.CULL_FACE);
                gl.enable(gl.DEPTH_TEST);
                // gl.enable(gl.BLEND);
                // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                // gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.drawElements(gl.TRIANGLES, this.mesh.vertexIndices.length, gl.UNSIGNED_SHORT, 0);
               
            break;

            case RenderMode.WIREFRAME:
                gl.enable(gl.CULL_FACE);
                gl.lineWidth(1); 
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.drawElements(gl.LINE_STRIP, this.mesh.vertexIndices.length, gl.UNSIGNED_SHORT, 0);
            break;

            case RenderMode.SOLID_WIRE:
                gl.uniform4fv(this.material.shader.getUniformLocation("uColor"), this.material.color.toVec4());
                gl.disable(gl.CULL_FACE);
                gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                gl.drawElements(gl.TRIANGLES, this.mesh.vertexIndices.length, gl.UNSIGNED_SHORT, 0);

                gl.uniform4fv(this.material.shader.getUniformLocation("uColor"),this.material.lineColor.toVec4());
                gl.enable(gl.CULL_FACE);
                gl.lineWidth(1); 
                gl.drawElements(gl.LINE_STRIP, this.mesh.vertexIndices.length, gl.UNSIGNED_SHORT, 0);
            break;
        }
    }

    private setUniformMatrix(gl: WebGLRenderingContext, shader: Shader, uniformName: string, matrix: Mat4, matrixType: string, context: ErrorContext): void {
        const uniformLocation = shader.getUniformLocation(uniformName);
        if (uniformLocation !== null) {
            gl.uniformMatrix4fv(uniformLocation, false, matrix.getData());
        } else {
            throw new AppError({
                ...context,
                message: `Uniform de ${matrixType} '${uniformName}' não encontrado no shader. Verifique se o uniform está corretamente definido no shader.`,
            });
        }
    }
}




















/**
 * Enum para representar os modos de renderização.
 */
export enum RenderMode {
    /**
     * Renderiza o objeto com uma textura aplicada.
     */
    TEXTURED = "TEXTURED",
    
    /**
     * Renderiza o objeto com uma cor sólida.
     */
    SOLID = "SOLID",
    
    /**
     * Renderiza o objeto em modo wireframe (malha de arame).
     */
    WIREFRAME = "WIREFRAME",
    
    /**
     * Renderiza o objeto com sombreamento básico.
     */
    SHADED = "SHADED",
    
    /**
     * Renderiza o objeto com efeitos de iluminação avançada.
     */
    ADVANCED = "ADVANCED",
    
    SOLID_WIRE  = "SOLIDWIRE"
}