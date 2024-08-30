import CameraController from "./Engine/CameraControler";
import MonoComportament from "./Engine/components/MonoComportament";
import Material3D from "./Engine/Core/Inplementations/Material";
import { Shader } from "./Shader/Shader";
import Mesh from "./Engine/graphycs/Mesh";
import MeshBuilder from "./Engine/graphycs/MeshBuilder";
import Camera from "./Engine/Core/Inplementations/Camera";
import HDRLoader from "../plugins/hdr-loader/hdrLoader";
import GameEntity from "./Engine/components/GameObject";
import Renderer from "./Engine/graphycs/Renderer";
import MeshRenderer from "./Engine/graphycs/MeshRenderer";


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

            this.texture = HDRLoader.createWebGLTexture(Renderer.wegl2, hdr);

        } catch (error) {
            console.error('Erro ao carregar o HDR:', error);
            throw error;
        }
    }

    public start(): void {
  
        this.skyDome = MeshBuilder.createSphere(100, 64, 64);
        this.skyDome.compile(); 
    
        this.material = new Material3D();
        this.material.albedo = this.texture;
    
        this.meshRenderer = new MeshRenderer();
        this.meshRenderer.setMesh(this.skyDome);
        this.meshRenderer.material = this.material;

        //-------------------------------------------------------------
        this.cubeMesh = MeshBuilder.createSquare();
        this.cubeMesh.compile();
        const cubeMaterial = new Material3D();
        this.cubeMeshRenderer = new MeshRenderer();
        this.cubeMeshRenderer.setMesh(this.cubeMesh);
        this.cubeMeshRenderer.material = cubeMaterial;
        cubeMaterial.setAlbedo("./src/Engine/Assets/2D/Textures/pngegg.png");
        // cubeMaterial.setNormalMap("./Assets/textures/normalMap.png");
        // this.skyBox = new Skybox(this.texture, this.camera);
    }

    public update(): void { 
   
        this.cubeMeshRenderer.render();
        Camera.currentCamera.aspectRatio = window.innerWidth / window.innerHeight;
        this.cameraControle.update(Camera.currentCamera); 
       
    }
}

const gameEntity = new GameEntity();
gameEntity.addComponent(Camera);

const meshRenderer = gameEntity.addComponent(MeshRenderer);
console.log(meshRenderer)