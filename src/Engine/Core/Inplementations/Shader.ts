import Mat4 from "../../graphycs/matrix4x4";
import Vec3 from "../../graphycs/vec3";
import WebGLAux, { ShaderUtils } from "../../graphycs/webGL";
import Color from "../../static/color";
type SupportedUniforms = Mat4 | Vec3 | number | boolean | Color;

export default class Shader {
    vertSource: string = `
        precision highp float;
        attribute vec3 a_position;
        uniform mat4 u_translation;
        uniform mat4 u_projection;
        uniform mat4 u_rotation;  
        uniform mat4 u_scale;    
        uniform mat4 u_view;   
        void main() {
            mat4 trs = u_translation * u_rotation * u_scale;
            vec4 model = trs * vec4(a_position, 1.0);
            vec4 mvp = u_projection * u_view * model;
            gl_Position = mvp;
        }
    `;

    fragSource: string = `
        precision highp float;
        uniform vec4 u_color;
        void main() {
            gl_FragColor = u_color;
        }
    `;

    shaderProgram: WebGLProgram | null = null;
    private uniformLocations: Map<string, WebGLUniformLocation | null> = new Map();

    // Método para compilar o shader e cachear localizações uniformes
    public compileShader(gl: WebGLRenderingContext) {
        if (!gl) {
            console.error("WebGLRenderingContext is not initialized.");
            return;
        }

        this.shaderProgram = ShaderUtils.createProgram(gl, this.vertSource, this.fragSource);

        if (!this.shaderProgram) {
            console.error("Failed to create shader program.");
            return;
        }

        gl.useProgram(this.shaderProgram);

        // Armazena as localizações uniformes
        this.cacheUniformLocation(gl, "u_translation");
        this.cacheUniformLocation(gl, "u_rotation");
        this.cacheUniformLocation(gl, "u_scale");
        this.cacheUniformLocation(gl, "u_view");
        this.cacheUniformLocation(gl, "u_projection");
        this.cacheUniformLocation(gl, "u_color");
    }

    // Método para buscar e armazenar uma localização uniforme
    private cacheUniformLocation(gl: WebGLRenderingContext, name: string) {
        if (!this.shaderProgram) return null;
        const location = gl.getUniformLocation(this.shaderProgram, name);
        this.uniformLocations.set(name, location);
    }

    // Método para recuperar uma localização uniforme (busca do cache)
    private getUniformLocation(name: string): WebGLUniformLocation | null {
        return this.uniformLocations.get(name) || null;
    }

    // Método para enviar uniformes com o tipo apropriado
    public send<T extends SupportedUniforms>(gl: WebGLRenderingContext, name: string, value: T): void {
        const location = this.getUniformLocation(name);

        if (!location) {
            console.warn(`Uniform ${name} not found in shader.`);
            return;
        }

        if (value instanceof Mat4) {
            gl.uniformMatrix4fv(location, false, value.getData());
        } else if (value instanceof Vec3) {
            gl.uniform3fv(location, value.toArray());
        } else if (typeof value === "number") {
            gl.uniform1f(location, value);
        } else if (typeof value === "boolean") {
            gl.uniform1i(location, value ? 1 : 0);
        } else if(value instanceof Color) {
            const [r, g, b, a] = value.toVec4();
            gl.uniform4f(location, r, g, b, a);
        } else {
            console.warn(`Unsupported uniform type for ${name}`);
        }
    }
}
