import EngineCache from "./Engine/Cache/EngineCache";
import CameraController from "./Engine/CameraControler";
import MonoComportament from "./Engine/components/base_mono";
import Material3D from "./Engine/Core/Inplementations/Material";
import { Shader } from "./Shader/Shader";
import Mesh from "./Engine/graphycs/Mesh";
import MeshBuilder from "./Engine/graphycs/MeshBuilder";
import MeshRenderer, { RenderMode } from "./Engine/graphycs/MeshRenderer";
import Camera from "./Engine/Core/Inplementations/Camera";
import HDRLoader from "../plugins/hdr-loader/hdrLoader";

export default class SimpleEngine extends MonoComportament {

    meshRenderer: MeshRenderer;
    material: Material3D;
    cameraControle: CameraController = new CameraController();
    triangleMesh: Mesh;
    texture: WebGLTexture;

    skyDome: Mesh;

    cubeMeshRenderer: MeshRenderer;
    cubeMesh: Mesh;


    public async loadResources() {
        try {
            const hdr = await HDRLoader.processHDRImage("./Assets/HDR/little_paris_eiffel_tower_4k(1).hdr");
            console.log('HDR carregado com sucesso:', hdr);

            const gl = EngineCache.gl;
            this.texture = HDRLoader.createWebGLTexture(gl, hdr);

        } catch (error) {
            console.error('Erro ao carregar o HDR:', error);
            throw error;
        }
    }

    public start(): void {
  
        this.skyDome = MeshBuilder.createSphere(100, 64, 64);
        this.skyDome.compile(EngineCache.gl); 
    
        this.material = new Material3D();
        this.material.albedo = this.texture;
    
        this.meshRenderer = new MeshRenderer();
        this.meshRenderer.setMesh(this.skyDome);
        this.meshRenderer.material = this.material;

        //-------------------------------------------------------------
        this.cubeMesh = MeshBuilder.createSquare();
        this.cubeMesh.compile(EngineCache.gl);
        const cubeMaterial = new Material3D();
        this.cubeMeshRenderer = new MeshRenderer();
        this.cubeMeshRenderer.setMesh(this.cubeMesh);
        this.cubeMeshRenderer.material = cubeMaterial;
        cubeMaterial.setAlbedo("./src/Engine/Assets/2D/Textures/pngegg.png");
        // cubeMaterial.setNormalMap("./Assets/textures/normalMap.png");
        // this.skyBox = new Skybox(this.texture, this.camera);
    }

    public update(): void { 
        const gl = EngineCache.gl;
   
        this.cubeMeshRenderer.render();
    
        Camera.currentCamera.aspectRatio = window.innerWidth / window.innerHeight;
        this.cameraControle.update(Camera.currentCamera); 
       
    }
}