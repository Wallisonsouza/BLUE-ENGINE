import EngineCache from "../../Cache/EngineCache";
import { ShaderUtils } from "../../engine/webGL";

export default class Shader {
    vertSource: string = `
        precision highp float;
      
        attribute vec3 aPosition;
        attribute vec2 aTexCoord;
      
        attribute vec4 a_color;
  
        uniform mat4 u_projection;
            
        uniform mat4 uTranslationMatrix;
        uniform mat4 uRotationMatrix;  
        uniform mat4 uScaleMatrix;    
        uniform mat4 u_view;   
        
       varying vec4 v_color;

        attribute vec3 a_Normal;
        varying vec3 v_Normal;

        varying vec2 vTexCoord;
        void main() {
            mat4 TRS = uTranslationMatrix * uRotationMatrix * uScaleMatrix;
            mat4 model = TRS;

            vec4 worldPos = model * vec4(aPosition, 1.0);
            vec4 viewPos = u_view * worldPos;

            gl_Position = u_projection * viewPos;

            v_color = a_color;
            v_Normal = a_Normal;
            vTexCoord = aTexCoord;
        }
    `;

    fragSource: string = `
       precision mediump float;
        uniform sampler2D uTexture;
        uniform vec4 uColor;
        varying vec2 vTexCoord;
        uniform vec2 uTiling;

        void main() {
            vec2 tiledTexCoord = vTexCoord * uTiling; 
            vec4 textureColor = texture2D(uTexture, tiledTexCoord);

            vec4 finalColor = mix(uColor, textureColor, textureColor.a);
            gl_FragColor = finalColor;
        }
    `;

    program: WebGLProgram | null = null;
    private attributeCache: Map<string, number> = new Map();
    private uniformCache: Map<string, WebGLUniformLocation> = new Map();

    public compile() {
        const gl = EngineCache.gl;

        if(gl){
            this.program = ShaderUtils.createProgram(gl, this.vertSource, this.fragSource);
            if(this.program) {
                console.log("programa criado com sucesso")
            }
            console.log("shader compilado com sucesso")
        } else {console.error("nao foi possivel localizar o gl")}

       
    }

    public getAttributeLocation(name: string): number | null {
        const gl = EngineCache.gl;
        const program = this.program;

        if (!gl) {
            console.error("WebGL context não disponível.");
            return null;
        }
        
        if (!program) {
            console.error("Programa do shader não disponível.");
            return null;
        }
    
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
    }

    public getUniformLocation(name: string): WebGLUniformLocation | null {
        const gl = EngineCache.gl;
        const program = this.program;

        if (!gl) {
            console.error("WebGL context não disponível.");
            return null;
        }
        
        if (!program) {
            console.error("Programa do shader não disponível.");
            return null;
        }
    
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
    }
}