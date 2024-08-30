import { Shader } from "../../Shader/Shader";
import EngineCache from "../Cache/EngineCache";
import Camera from "../Core/Inplementations/Camera";
import Vec3 from "../Core/Math/Vec3";
import Color from "../static/color";
import Mesh from "./Mesh";
import MeshBuilder from "./MeshBuilder";
import { Renderer } from "./SpriteRenderer";

export default class Gizmos {

    private static lineShader: Shader | null = null;
    private static vertexBuffer: WebGLBuffer | null = null;
    private static indexBuffer: WebGLBuffer | null = null;
    private static mesh: Mesh | null = null;
    private static cubeShader: Shader | null = null;
    public static color: Color = Color.white;

    public static drawLine(start: Vec3, end: Vec3) {
        const gl = Renderer.wegl2;
        const camera = Camera.currentCamera;

        if (!gl || !camera) {
            console.error("WebGL context or camera not found in EngineCache.");
            return;
        }

        if (!Gizmos.lineShader) {
            this.lineShader = Gizmos.createLineShader();
        }

        if (!Gizmos.vertexBuffer) {
            Gizmos.vertexBuffer = gl.createBuffer();
        }
        if (!Gizmos.indexBuffer) {
            Gizmos.indexBuffer = gl.createBuffer();
        }

        const lineVertices = new Float32Array([
            start.x, start.y, start.z,
            end.x, end.y, end.z
        ]);

        const lineIndices = new Uint16Array([0, 1]);

        // Configurar o buffer de vértices
        gl.bindBuffer(gl.ARRAY_BUFFER, Gizmos.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, lineVertices, gl.STATIC_DRAW);

        // Configurar o buffer de índices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Gizmos.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, lineIndices, gl.STATIC_DRAW);

        // Usar o shader
        Gizmos.lineShader.use();

        // Definir atributos
        Gizmos.lineShader.enableAttribute3f(gl, "aPosition");
        gl.bindBuffer(gl.ARRAY_BUFFER, Gizmos.vertexBuffer);

        Gizmos.lineShader.setUniformMatrix4fv("uView", camera.getViewMatrix());
        Gizmos.lineShader.setUniformMatrix4fv("uProjection", camera.getProjectionMatrix());

        // Definir a cor da linha
        Gizmos.lineShader.setUniform4fv("uColor", Gizmos.color.toVec4());

        gl.disable(gl.DEPTH_TEST);
        // Desenhar a linha
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Gizmos.indexBuffer);
        gl.drawElements(gl.LINES, 2, gl.UNSIGNED_SHORT, 0);

        // Limpeza dos buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    public static drawFillCube(center: Vec3, size: Vec3) {
        const gl = EngineCache.gl;
        const camera = Camera.currentCamera;
    
        if (!gl || !camera) {
            console.error("WebGL context or camera not found in EngineCache.");
            return;
        }
    
        if (!Gizmos.cubeShader) {
            Gizmos.cubeShader = Gizmos.createCubeShader();
        }
    
        if (!Gizmos.vertexBuffer) {
            Gizmos.vertexBuffer = gl.createBuffer();
        }
        if (!Gizmos.indexBuffer) {
            Gizmos.indexBuffer = gl.createBuffer();
        }
    
        const halfSizeX = size.x / 2;
        const halfSizeY = size.y / 2;
        const halfSizeZ = size.z / 2;
    
        const vertices: Float32Array = new Float32Array([
            // Front face
            center.x - halfSizeX, center.y - halfSizeY, center.z + halfSizeZ,
            center.x + halfSizeX, center.y - halfSizeY, center.z + halfSizeZ,
            center.x + halfSizeX, center.y + halfSizeY, center.z + halfSizeZ,
            center.x - halfSizeX, center.y + halfSizeY, center.z + halfSizeZ,
    
            // Back face
            center.x - halfSizeX, center.y - halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y - halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y + halfSizeY, center.z - halfSizeZ,
            center.x - halfSizeX, center.y + halfSizeY, center.z - halfSizeZ,
    
            // Top face
            center.x - halfSizeX, center.y + halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y + halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y + halfSizeY, center.z + halfSizeZ,
            center.x - halfSizeX, center.y + halfSizeY, center.z + halfSizeZ,
    
            // Bottom face
            center.x - halfSizeX, center.y - halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y - halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y - halfSizeY, center.z + halfSizeZ,
            center.x - halfSizeX, center.y - halfSizeY, center.z + halfSizeZ,
    
            // Right face
            center.x + halfSizeX, center.y - halfSizeY, center.z - halfSizeZ,
            center.x + halfSizeX, center.y - halfSizeY, center.z + halfSizeZ,
            center.x + halfSizeX, center.y + halfSizeY, center.z + halfSizeZ,
            center.x + halfSizeX, center.y + halfSizeY, center.z - halfSizeZ,
    
            // Left face
            center.x - halfSizeX, center.y - halfSizeY, center.z - halfSizeZ,
            center.x - halfSizeX, center.y - halfSizeY, center.z + halfSizeZ,
            center.x - halfSizeX, center.y + halfSizeY, center.z + halfSizeZ,
            center.x - halfSizeX, center.y + halfSizeY, center.z - halfSizeZ
        ]);
    
        const indices: Uint16Array = new Uint16Array([
            // Front face
            0, 1, 2, 2, 3, 0,
    
            // Back face
            4, 5, 6, 6, 7, 4,
    
            // Top face
            8, 9, 10, 10, 11, 8,
    
            // Bottom face
            12, 13, 14, 14, 15, 12,
    
            // Right face
            16, 17, 18, 18, 19, 16,
    
            // Left face
            20, 21, 22, 22, 23, 20
        ]);
    
        // Configurar o buffer de vértices
        gl.bindBuffer(gl.ARRAY_BUFFER, Gizmos.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
        // Configurar o buffer de índices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Gizmos.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
        // Usar o shader
        Gizmos.cubeShader.use();
    
        // Definir atributos
        Gizmos.cubeShader.enableAttribute3f(gl, "aPosition");
        gl.bindBuffer(gl.ARRAY_BUFFER, Gizmos.vertexBuffer);
    
        Gizmos.cubeShader.setUniformMatrix4fv("uView", camera.getViewMatrix());
        Gizmos.cubeShader.setUniformMatrix4fv("uProjection", camera.getProjectionMatrix());
        Gizmos.cubeShader.setUniform4fv("uColor", Gizmos.color.toVec4());
    
        gl.disable(gl.DEPTH_TEST); // Desativar o teste de profundidade
    
        // Desenhar o cubo
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Gizmos.indexBuffer);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    
        gl.enable(gl.DEPTH_TEST); // Reativar o teste de profundidade
    
        // Limpeza dos buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    private static createLineShader() {
        const gl = EngineCache.gl;

        const shader = new Shader();

        if (!gl) {
            console.error("WebGL context not found in EngineCache.");
            return null;
        }

        // Definição dos shaders (Exemplos de código GLSL)
        const vertexShaderSource = `
            attribute vec3 aPosition;
            uniform mat4 uModel;
            uniform mat4 uView;
            uniform mat4 uProjection;
            void main() {
                gl_Position = uProjection * uView * vec4(aPosition, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec4 uColor;
            void main() {
                gl_FragColor = uColor;
            }
        `;

        shader.setVertSource(vertexShaderSource);
        shader.setFragSource(fragmentShaderSource);
        shader.compile();

        return shader;
    }

    private static createCubeShader(): Shader | null {
        const gl = EngineCache.gl;

        if (!gl) {
            console.error("WebGL context not found in EngineCache.");
            return null;
        }

        const shader = new Shader();

        const vertexShaderSource = `
            attribute vec3 aPosition;
            uniform mat4 uModel;
            uniform mat4 uView;
            uniform mat4 uProjection;
            void main() {
                gl_Position = uProjection * uView * vec4(aPosition, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            uniform vec4 uColor;
            void main() {
                gl_FragColor = uColor;
            }
        `;

        shader.setVertSource(vertexShaderSource);
        shader.setFragSource(fragmentShaderSource);
        shader.compile();

        return shader;
    }
}
