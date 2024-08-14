import Camera from "../Core/Inplementations/Camera";
import Material from "../Core/Inplementations/Material";
import Transform from "../Core/Inplementations/Transform";
import Color from "../static/color";
import Mat4 from "./matrix4x4";
import Vec3 from "./vec3";
import WebGL, { BufferUsage } from "./webGL";


export default class WebGLLink {

    public gl: WebGLRenderingContext | null = null;
    public camera: Camera = new Camera();
    public transform: Transform = new Transform();
    public material: Material = new Material();
 
    constructor(canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

        if (!this.gl) {
            console.error("O contexto WebGL não está disponível.");
            return;
        }

        this.init();
    }
    
    private init() {
        const gl = this.gl;
        if (!gl) return;
        this.material.shader.compileShader(gl);
    }


    public drawFillRect(x: number= 0, y: number = 0, z: number = 0, width: number = 1, height: number = 1) {
        if (!this.gl || !this.material.shader.shaderProgram) return;

        // Define a metade da largura e altura
        const halfWidth = width / 2;
        const halfHeight = height / 2;

    
        const vertices = new Float32Array([
            x - halfWidth, y - halfHeight, z,
            x + halfWidth, y - halfHeight, z,
            x - halfWidth, y + halfHeight, z,
            x + halfWidth, y + halfHeight, z
        ]);
    
        this.gl.useProgram(this.material.shader.shaderProgram);
        
        const vertexBuffer = WebGL.createVertexBuffer(this.gl, vertices, BufferUsage.STATIC_DRAW);

        const positionLoc = this.gl.getAttribLocation(this.material.shader.shaderProgram, "a_position");
        this.gl.enableVertexAttribArray(positionLoc);
        const numComponents = 3;    // (x, y, z)
        const type = this.gl.FLOAT; // 32bit floating point values
        const normalize = false;    // leave the values as they are
        const offset = 0;           // start at the beginning of the buffer
        const stride = 0;           // how many bytes to move to the next vertex
        this.gl.vertexAttribPointer(positionLoc, numComponents, type, normalize, stride, offset);
        
        this.setUniforms(this.gl, this.material.shader.shaderProgram);
       
        if(this.camera.depth){
            this.gl.enable(this.gl.DEPTH_TEST)
        }
      
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
    private setUniforms(gl:WebGLRenderingContext, program: WebGLProgram) {

        if(gl && program){
           
           
            const translation = Mat4.translate(this.transform.position);
            this.material.shader.send<Mat4>(gl, "u_translation", translation);
            
            const rotation = Mat4.rotate(this.transform.rotation);
            this.material.shader.send<Mat4>(gl, "u_rotation", rotation);
            
            const scale = Mat4.scale(this.transform.scale);
            this.material.shader.send<Mat4>(gl, "u_scale", scale);
            
            const view = this.camera.getViewMatrix();
            this.material.shader.send<Mat4>(gl, "u_view", view);

            const projection = this.camera.getProjectionMatrix();
            this.material.shader.send<Mat4>(gl, "u_projection", projection);
            
            const color = this.material.color;
            this.material.shader.send<Color>(gl, "u_color", color);
           
        }
    }
    



  public drawPlaneXY(
        verticalSize: number = 10, 
        horizontalSize: number = 10, 
        numLinesVertical: number = 10,
        numLinesHorizontal: number = 10
    ): void {
        const vertices: number[] = [];
    
       
        if (numLinesHorizontal > 0) {
            if (numLinesHorizontal === 1) {
                const yPosition = 0;
                vertices.push(
                    -horizontalSize, yPosition,
                    horizontalSize, yPosition   
                );
            } else {
           
                const stepY = (2 * verticalSize) / (numLinesHorizontal - 1);
                for (let index = 0; index < numLinesHorizontal; index++) {
                    const yPosition = -verticalSize + index * stepY;
                    vertices.push(
                        -horizontalSize, yPosition, 
                        horizontalSize, yPosition  
                    );
                }
            }
        }
   
        if (numLinesVertical > 0) {
            if (numLinesVertical === 1) {
                const xPosition = 0;
                vertices.push(
                    xPosition, -verticalSize,
                    xPosition, verticalSize 
                );
            } else {
                const stepX = (2 * horizontalSize) / (numLinesVertical - 1);
                for (let index = 0; index < numLinesVertical; index++) {
                    const xPosition = -horizontalSize + index * stepX;
                    vertices.push(
                        xPosition, -verticalSize,
                        xPosition, verticalSize  
                    );
                }
            }
        }
    
        this.drawLines(new Float32Array(vertices));
    }
    
    private drawLines(vertices: Float32Array): void {
        if (!this.gl || !this.material.shader.shaderProgram) return;
 
        this.gl.useProgram(this.material.shader.shaderProgram);

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    
        const positionLocation = this.gl.getAttribLocation(this.material.shader.shaderProgram, "a_position");
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.setUniforms(this.gl, this.material.shader.shaderProgram);
    
        this.gl.drawArrays(this.gl.LINES, 0, vertices.length / 2);
       
    }

    public drawLine(start: Vec3, end: Vec3) {
        if (!this.gl || !this.material.shader.shaderProgram){
            console.error("Erro ao carregar o programa gl, ou o shaderProgram")
            return;
        }
    
        const shaderProgram = this.material.shader.shaderProgram;
        this.gl.useProgram(shaderProgram);
    
        const vertices = new Float32Array([
            start.x, start.y, start.z,
            end.x, end.y, end.z
        ]);
    
        const vertexBuffer = this.gl.createBuffer();
        if (!vertexBuffer) {
            console.error("Não foi possível criar o buffer de vértices.");
            return;
        }
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    
      
        const positionLocation = this.gl.getAttribLocation(shaderProgram, "a_position");
        if (positionLocation === -1) {
            console.error("Não foi possível encontrar o atributo 'a_position' no shader.");
            return;
        }
        
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    
       
        this.setUniforms(this.gl, shaderProgram);
    
        this.gl.drawArrays(this.gl.LINES, 0, vertices.length / 3);
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.deleteBuffer(vertexBuffer);
    }
    
}