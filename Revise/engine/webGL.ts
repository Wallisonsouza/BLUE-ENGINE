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


