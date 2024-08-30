import { MeshUtil } from "../static/Util";

export default class Mesh {

    public vertices: Float32Array | null = null;
    public triangles: Uint16Array | null = null;;
    public normals: Float32Array | null = null;;
    public uvs: Float32Array | null = null;;

    public vertexBuffer: WebGLBuffer | null = null;
    public indexBuffer: WebGLBuffer | null = null;
    public normalBuffer: WebGLBuffer | null = null;
    public UVBuffer: WebGLBuffer | null = null;
    
    public compile(gl: WebGLRenderingContext): void {
        this.createVertexBuffer(gl);
        this.createIndexBuffer(gl);
        this.createNormalBuffer(gl);
        this.createUVBuffer(gl);
    }

    private createVertexBuffer(gl: WebGLRenderingContext): void {
        this.vertexBuffer = MeshUtil.createVertexBuffer(gl, this.vertices);
    }

    private createIndexBuffer(gl: WebGLRenderingContext): void {
        this.indexBuffer = MeshUtil.createIndexBuffer(gl, this.triangles);
    }

    private createNormalBuffer(gl: WebGLRenderingContext): void {
        this.normalBuffer = MeshUtil.createNormalBuffer(gl, this.normals);
    }

    private createUVBuffer(gl: WebGLRenderingContext): void {
        this.UVBuffer = MeshUtil.createUVBuffer(gl, this.uvs);
    }
}