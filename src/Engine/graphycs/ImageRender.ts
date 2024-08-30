import EngineCache from "../Cache/EngineCache";

export default class ImageRender {
    public image: HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame;

    constructor(image: HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame) {
        this.image = image;
    }

    public render(): void {
        const gl = EngineCache.gl;
        if (!gl) {
            console.error("WebGL não disponível.");
            return;
        }

        // Cria e configura a textura
        const texture = gl.createTexture();
        if (!texture) {
            console.error("Não foi possível criar a textura.");
            return;
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Define os parâmetros da textura
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Carrega a imagem na textura
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

        // Configura o shader
        const vertexShaderSource = `
            attribute vec2 aPosition;
            attribute vec2 aTexCoord;
            varying vec2 vTexCoord;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
                vTexCoord = aTexCoord;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 vTexCoord;
            uniform sampler2D uTexture;
            void main() {
                gl_FragColor = texture2D(uTexture, vTexCoord);
            }
        `;

        const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const shaderProgram = this.createShaderProgram(gl, vertexShader, fragmentShader);

        gl.useProgram(shaderProgram);

        // Define os atributos e uniforms do shader
        const positionLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
        const texCoordLocation = gl.getAttribLocation(shaderProgram, 'aTexCoord');
        const textureLocation = gl.getUniformLocation(shaderProgram, 'uTexture');

        // Cria e configura o buffer de posições
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        // Cria e configura o buffer de coordenadas de textura
        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        const texCoords = new Float32Array([
            0, 0,
            1, 0,
            0, 1,
            0, 1,
            1, 0,
            1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        // Vincula os buffers aos atributos do shader
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Define a textura como uniforme
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(textureLocation, 0);

        // Limpa o buffer e desenha a textura
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    private createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
        const shader = gl.createShader(type);
        if (!shader) {
            throw new Error("Não foi possível criar o shader.");
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error("Erro ao compilar o shader: " + gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    private createShaderProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        const program = gl.createProgram();
        if (!program) {
            throw new Error("Não foi possível criar o programa de shader.");
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error("Erro ao vincular o programa de shader: " + gl.getProgramInfoLog(program));
        }
        return program;
    }
}
