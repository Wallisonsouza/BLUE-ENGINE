export default class WebGL {

   

    public static createVertexBuffer(
        gl: WebGLRenderingContext,
        data: ArrayBuffer | Float32Array | Uint16Array | Uint32Array, 
        usage: BufferUsage
    ) {
        return WebGL.createBuffer(gl, gl.ARRAY_BUFFER, data, usage)
    }

    public static createProgram(
        gl: WebGLRenderingContext, 
        vertexShader: WebGLShader | null, 
        fragmentShader: WebGLShader | null
    ): WebGLProgram | null {
        // Verifica se os shaders são válidos
        if (!vertexShader || !fragmentShader) {
            console.error("Shaders inválidos fornecidos");
            return null;
        }
    
        // Cria o programa
        const program = gl.createProgram();
        if (!program) {
            console.error("Falha ao criar o programa");
            return null;
        }
    
        // Anexa os shaders ao programa
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
    
        // Linka o programa
        gl.linkProgram(program);
    
        // Verifica se o programa foi linkado com sucesso
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Erro ao linkar o programa:", gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
    
        return program;
    }

   
    public static createBuffer(
        gl: WebGLRenderingContext, 
        target: number, 
        data: ArrayBuffer | Float32Array | Uint16Array | Uint32Array, 
        usage: number
    ): WebGLBuffer | null {
  
        const buffer = gl.createBuffer();
        if (!buffer) {
            console.error("Falha ao criar o buffer.");
            return null;
        }
      
        gl.bindBuffer(target, buffer);
        gl.bufferData(target, data, usage);
        
    
        return buffer;
    }
    
}

export enum BufferUsage {
    STATIC_DRAW = 0x88E4,     
    DYNAMIC_DRAW = 0x88E8,    
    STREAM_DRAW = 0x88E0     
}

export class ShaderUtils {
    
    public static debugMode = true;
   
    private static createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
        try {
            const shader = gl.createShader(type);
            if (!shader) {
                throw new Error(`Failed to create shader of type ${type}`);
            }
    
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
    
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                const errorMsg = gl.getShaderInfoLog(shader);
                gl.deleteShader(shader);
                throw new Error(`Shader compile error: ${errorMsg}`);
            }
    
            return shader; 
        } catch (error) {
            console.error("Shader creation error:", error.message);
            return null;
        }
    }
    

    public static createVertexShader(gl: WebGLRenderingContext, source: string): WebGLShader | null {
        let vertShader = ShaderUtils.createShader(gl, gl.VERTEX_SHADER, source);

        if (!vertShader) {
            console.warn("Failed to create vertex shader, using default shader.");

        }
   
        return vertShader;
    }

    public static createFragmentShader(gl: WebGLRenderingContext, source: string): WebGLShader | null {
        let fragShader = ShaderUtils.createShader(gl, gl.FRAGMENT_SHADER, source);

        if (!fragShader) {
            console.warn("Failed to create fragment shader, using default shader.");
          
        }

        return fragShader;
    }

    public static createProgram(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram | null {
        try {
            const vertexShader = ShaderUtils.createVertexShader(gl, vertexShaderSource);
            const fragmentShader = ShaderUtils.createFragmentShader(gl, fragmentShaderSource);

            if (!vertexShader || !fragmentShader) {
                throw new Error("Failed to create one or both shaders");
            }
           
            const program = gl.createProgram();
            if (!program) {
                throw new Error("Failed to create WebGL program");
            }

            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);

            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                const errorMsg = gl.getProgramInfoLog(program);
                gl.deleteProgram(program);
                throw new Error(`Program link error: ${errorMsg}`);
            }

            return program;
        } catch (error) {
            console.error("Program creation error:", error.message);
            return null;
        }
    }
}

