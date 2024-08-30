import EngineCache from "../Cache/EngineCache";
import Material from "../Core/Inplementations/Material";
import { AppError } from "../Core/Error/AppError";
import { ErrorContext } from "../Core/Error/ErrorContext";
import Vec3 from "../Core/Math/vec3";

export default class Mesh {
    
    public material: Material = new Material();

    public vertices: Float32Array;
    public vertexIndices: Uint16Array;

    public normals: Float32Array;
    public normalIndices: Uint16Array;

    public UVs: Float32Array;
    public UVIndices: Uint16Array;

    public vertexBuffer: WebGLBuffer | null = null;
    public indexBuffer: WebGLBuffer | null = null;
    public normalBuffer: WebGLBuffer | null = null;
    public UVBuffer: WebGLBuffer | null = null;
    public UVIndexBuffer: WebGLBuffer | null = null;

    constructor(
        vertices: Float32Array = new Float32Array(),
        indices: Uint16Array = new Uint16Array(),
        textureCoords: Float32Array = new Float32Array(),
        normals: Float32Array = new Float32Array()
    ) {
        this.vertices = vertices;
        this.vertexIndices = indices;
        this.UVs = textureCoords;
        this.normals = normals;
    }

    /**
     * Compila a malha criando e vinculando os buffers necessários.
     * @throws {AppError} Lança um erro se o contexto WebGL não estiver disponível.
     */
    public compile(): void {
        const gl = EngineCache.gl;
        const context = new ErrorContext("EngineCache", "Mesh", "compile");

        if (!gl) {
        throw new AppError({
            ...context,
            message: 'Contexto WebGL não disponível. Certifique-se de que o contexto de renderização foi inicializado corretamente.'
        });
        }

        try {
            this.calculateNormals();
            this.createVertexBuffer(gl);
            this.createIndexBuffer(gl);

            this.createNormalBuffer(gl);

            this.createUVBuffer(gl);
            this.createUVIndexBuffer(gl);
            
        } catch (error) {
        throw new AppError({
            ...context,
            message: error.message,
        });
        }
    }

    private createVertexBuffer(gl: WebGLRenderingContext): void {
        const context = new ErrorContext("EngineCache", "Mesh", "createVertexBuffer");

        this.vertexBuffer = gl.createBuffer();
        if (!this.vertexBuffer) {
        throw new AppError({
            ...context,
            message: 'Falha ao criar o buffer de vértices. Verifique se o contexto WebGL está funcionando corretamente.',
        });
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
    }

    private createIndexBuffer(gl: WebGLRenderingContext): void {
        const context = new ErrorContext("EngineCache", "Mesh", "createIndexBuffer");

        this.indexBuffer = gl.createBuffer();
        if (!this.indexBuffer) {
        throw new AppError({
            ...context,
            message: 'Falha ao criar o buffer de índices. Verifique se o contexto WebGL está funcionando corretamente.',
        });
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndices, gl.STATIC_DRAW);
    }

    private createNormalBuffer(gl: WebGLRenderingContext): void {
        const context = new ErrorContext("EngineCache", "Mesh", "createNormalBuffer");

        this.normalBuffer = gl.createBuffer();
        if (!this.normalBuffer) {
        throw new AppError({
            ...context,
            message: 'Falha ao criar o buffer de normais. Verifique se o contexto WebGL está funcionando corretamente.',
        });
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    }

    private createUVBuffer(gl: WebGLRenderingContext): void {
        const context = new ErrorContext("EngineCache", "Mesh", "createTextureCoordBuffer");

        this.UVBuffer = gl.createBuffer();
        if (!this.UVBuffer) {
        throw new AppError({
            ...context,
            message: 'Falha ao criar o buffer de coordenadas de textura. Verifique se o contexto WebGL está funcionando corretamente.',
        });
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.UVBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.UVs, gl.STATIC_DRAW);
    }

    private createUVIndexBuffer(gl: WebGLRenderingContext): void {
        this.UVIndexBuffer = gl.createBuffer();
        if (!this.UVIndexBuffer) {
            throw new Error('Falha ao criar o buffer de índices UV.');
        }
    
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.UVIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.UVIndices, gl.STATIC_DRAW);
    }
    

    /**
     * Calcula as normais dos vértices com base nas faces.
     */
    public calculateNormals(): void {
        const vertices = this.vertices;
        const indices = this.vertexIndices;

        this.normals = new Float32Array(vertices.length);
        this.normals.fill(0);

        for (let i = 0; i < indices.length; i += 3) {
        const i1 = indices[i] * 3;
        const i2 = indices[i + 1] * 3;
        const i3 = indices[i + 2] * 3;

        const v1 = new Vec3(vertices[i1], vertices[i1 + 1], vertices[i1 + 2]);
        const v2 = new Vec3(vertices[i2], vertices[i2 + 1], vertices[i2 + 2]);
        const v3 = new Vec3(vertices[i3], vertices[i3 + 1], vertices[i3 + 2]);

        const edge1 = Vec3.subtract(v2, v1);
        const edge2 = Vec3.subtract(v3, v1);

        const normal = Vec3.normalize(Vec3.cross(edge1, edge2));
        this.normals[i1] += normal.x;
        this.normals[i1 + 1] += normal.y;
        this.normals[i1 + 2] += normal.z;

        this.normals[i2] += normal.x;
        this.normals[i2 + 1] += normal.y;
        this.normals[i2 + 2] += normal.z;

        this.normals[i3] += normal.x;
        this.normals[i3 + 1] += normal.y;
        this.normals[i3 + 2] += normal.z;
        }

        // Normalização das normais
        for (let i = 0; i < this.normals.length; i += 3) {
        const normal = new Vec3(this.normals[i], this.normals[i + 1], this.normals[i + 2]);
        const normalizedNormal = Vec3.normalize(normal);
        this.normals[i] = normalizedNormal.x;
        this.normals[i + 1] = normalizedNormal.y;
        this.normals[i + 2] = normalizedNormal.z;
        }
    }
}
