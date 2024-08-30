import Mat4 from "../Engine/Core/Math/Mat4";
import IShader from "./IShader";
import ShaderUtil from "./Shader.Util";
import Vec2 from "../Engine/Core/Math/Vec2";
import Renderer from "../Engine/graphycs/Renderer";
;

export class Shader implements IShader {
    private vertSource: string = `
     // Shader de Vértice (GLSL ES 1.00)
        attribute vec3 aPosition;
        attribute vec2 aTexCoord;

        uniform mat4 uModel;
        uniform mat4 uView;
        uniform mat4 uProjection;
        uniform mat4 uShadowMatrix;

        varying vec2 vTexCoord;
        varying vec4 vShadowCoord;

        void main() {
            vec4 worldPosition = uModel * vec4(aPosition, 1.0);
            
            vTexCoord = aTexCoord;
            vShadowCoord = uShadowMatrix * worldPosition;

            gl_Position = uProjection * uView * worldPosition;
        }
    `;

    private fragSource: string = `
        precision mediump float;

        uniform vec4 uColor;        // Cor uniforme
        uniform sampler2D uAlbedo;  // Textura
        uniform bool uHasAlbedo;    // Flag para indicar se a textura está presente

        varying vec2 vTexCoord;     // Coordenadas de textura passadas do shader de vértice

        void main() {
            vec4 textureColor = uHasAlbedo ? texture2D(uAlbedo, vTexCoord) : vec4(1.0); // Cor padrão se não houver textura
            gl_FragColor = uColor * textureColor;
        }

    `;

    private gl: WebGL2RenderingContext = Renderer.wegl2;
    private program: WebGLProgram | null;

    private attributeCache: Map<string, number> = new Map();
    private uniformCache: Map<string, WebGLUniformLocation> = new Map();

    private static currentProgram: WebGLProgram | null = null;

   
    public setFragSource(source: string): void {
        this.fragSource = source;
    }
   
    public setVertSource(source: string): void {
        this.vertSource = source;
    }
 
    public compile(): void {
        this.program = ShaderUtil.createProgram(this.gl, this.vertSource, this.fragSource);
        if (!this.program) {
            throw new Error("Falha ao criar o programa de shaders.");
        }

        this.use();

        // this.setUniform2f('uTiling', 1.0, 1.0);
        // this.setUniform2f('uOffset', 0.0, 0.0);

        console.log("Shader compilado e programa criado com sucesso.");
    }

    public use(): void {
        if (Shader.currentProgram !== this.program) {
            this.gl.useProgram(this.program);
            Shader.currentProgram = this.program;
        }
    }

    public deactivate(): void {
        if (Shader.currentProgram === this.program) {
            this.gl.useProgram(null);
            Shader.currentProgram = null;
        }
    }

    public setUniform2f(name: string, x: number, y: number): void {
        const location = this.getUniformLocation(name);
        if (location) {
            this.gl.uniform2f(location, x, y);
        }
    }

    public setUniform2fv(name: string, values: Float32Array | number[] | Vec2): void {
        const location = this.getUniformLocation(name);
    
        if (location) {
          
            if (!(values instanceof Float32Array)) {
                if (Array.isArray(values)) {
                    values = new Float32Array(values);
                } else if (values instanceof Vec2) {
                    values = new Float32Array([values.x, values.y]);
                }
            }
            
            this.gl.uniform2fv(location, values);
        } 
    }

    public setUniform1i(name: string, value: number){
        const location = this.getUniformLocation(name);
        if(location){
            this.gl.uniform1i(location, value);
        }
    }

    public setUniformMatrix4fv(name: string, matrix: Float32Array | Mat4): void {
        const location = this.getUniformLocation(name);
        if (location) {

            if (!(matrix instanceof Float32Array)) {
                matrix = matrix.getData();
            }
            this.gl.uniformMatrix4fv(location, false, matrix);
        }
    }
    
    public setUniform4f(name: string, x: number, y: number, z: number, w: number) {
        const location = this.getUniformLocation(name);
        if (location) {
            this.gl.uniform4f(location, x, y, z, w);
        }
    }

    public setUniform4fv(name: string, value: number[]) {
        const location = this.getUniformLocation(name);
        if (location) {
            this.gl.uniform4fv(location, value);
        }
    }

    private withGlAndProgram<T>(callback: (gl: WebGLRenderingContext, program: WebGLProgram) => T | null): T | null {
        if (!this.gl) {
            console.error("WebGL context não disponível.");
            return null;
        }

        if (!this.program) {
            console.error("Programa do shader não disponível.");
            return null;
        }

        return callback(this.gl, this.program);
    }

    public getAttributeLocation(name: string): number | null {
        return this.withGlAndProgram((gl, program) => {
            if (this.attributeCache.has(name)) {
                return this.attributeCache.get(name)!;
            }

            const location = gl.getAttribLocation(program, name);
            if (location === -1) {
                console.error(`Não foi possível encontrar o atributo '${name}' no shader.`);
                return null;
            }

            this.attributeCache.set(name, location);
            return location;
        });
    }

    public getUniformLocation(name: string): WebGLUniformLocation | null {
        return this.withGlAndProgram((gl, program) => {
            if (this.uniformCache.has(name)) {
                return this.uniformCache.get(name)!;
            }

            const location = gl.getUniformLocation(program, name);
            if (!location) {
                console.error(`Não foi possível encontrar o uniforme '${name}' no shader.`);
                return null;
            }

            this.uniformCache.set(name, location);
            return location;
        });
    }

    public dispose(): void {
        if (this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
    }

    public enableAttribute3f(gl: WebGLRenderingContext, name: string) {
        const location = this.getAttributeLocation(name);
        if (location !== null) {
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
        }
    }

    public enableAttribute2f(gl: WebGLRenderingContext, name: string) {
        const location = this.getAttributeLocation(name);
        if (location !== null) {
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
        }
    }

    public disableAttribute(gl: WebGLRenderingContext, name: string) {
        const location = this.getAttributeLocation(name);
        if(location !== null) {
            gl.disableVertexAttribArray(location);
        }
    }
}