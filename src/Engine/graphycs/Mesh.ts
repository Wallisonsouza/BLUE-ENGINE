import { MeshUtil } from "../static/Util";
import Renderer from "./Renderer";

export default class Mesh {

    public vertices: Float32Array | null = null;
    public triangles: Uint16Array | null = null;;
    public normals: Float32Array | null = null;;
    public uvs: Float32Array | null = null;;
    public vertexBuffer: WebGLBuffer | null = null;
    public indexBuffer: WebGLBuffer | null = null;
    public normalBuffer: WebGLBuffer | null = null;
    public UVBuffer: WebGLBuffer | null = null;
    private gl: WebGL2RenderingContext = Renderer.wegl2;
    
    public compile(): void { 
        this.createVertexBuffer(this.gl);
        this.createIndexBuffer(this.gl);
        this.createNormalBuffer(this.gl);
        this.createUVBuffer(this.gl);
    }

    private createVertexBuffer(gl: WebGLRenderingContext): void {
        this.vertexBuffer = MeshUtil.createVertexBufferWebGl(gl, this.vertices);
    }

    private createIndexBuffer(gl: WebGLRenderingContext): void {
        this.indexBuffer = MeshUtil.createIndexBufferWebGl(gl, this.triangles);
    }

    private createNormalBuffer(gl: WebGLRenderingContext): void {
        this.normalBuffer = MeshUtil.createNormalBufferWebGl(gl, this.normals);
    }

    private createUVBuffer(gl: WebGLRenderingContext): void {
        this.UVBuffer = MeshUtil.createUVBufferWebGl(gl, this.uvs);
    }
}