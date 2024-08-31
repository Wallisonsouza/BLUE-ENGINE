import CameraController from "./Engine/CameraControler";
import MonoComportament from "./Engine/components/MonoComportament";
import Material3D, { Material2D } from "./Engine/Core/Inplementations/Material";
import Mesh from "./Engine/graphycs/Mesh";
import MeshBuilder from "./Engine/graphycs/MeshBuilder";
import Camera from "./Engine/Core/Inplementations/Camera";
import HDRLoader from "../plugins/hdr-loader/hdrLoader";
import Renderer from "./Engine/graphycs/Renderer";
import MeshRenderer from "./Engine/graphycs/MeshRenderer";
import CameraManager from "./Engine/CameraManager";
import SpriteRenderer, { Sprite } from "./Engine/graphycs/SpriteRenderer";

export default class SimpleEngine extends MonoComportament {

    meshRenderer: MeshRenderer;
    material: Material3D;
    cameraControle: CameraController = new CameraController();
    triangleMesh: Mesh;
    texture: WebGLTexture;

    skyDome: Mesh;
    spriteRenderer: SpriteRenderer;

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

        Camera.editorCamera.invert = true;
        Camera.currentCamera.farPlane = 2000;
        new CameraManager(Camera.editorCamera);
   

        this.skyDome = MeshBuilder.createSphere(100, 64, 64);
        this.skyDome.compile(); 
    
        this.material = new Material3D();
        this.material.albedo = this.texture;
    
        this.meshRenderer = new MeshRenderer();
        this.meshRenderer.setMesh(this.skyDome);
        this.meshRenderer.material = this.material;

        //-------------------------------------------------------------
        

        const materia2D = new Material2D();
        materia2D.setTexture("./src/Engine/Assets/2D/Textures/pngegg.png");

        const sprite = new Sprite();
        const spriteRenderer = new SpriteRenderer();

        this.spriteRenderer = spriteRenderer;
        this.spriteRenderer.sprite = sprite;
        this.spriteRenderer.material = materia2D;
     
        // cubeMaterial.setNormalMap("./Assets/textures/normalMap.png");
        // this.skyBox = new Skybox(this.texture, this.camera);
    }

    public update(): void { 

        // this.meshRenderer.render();
        this.spriteRenderer.render();
        
        const aspect = window.innerWidth / window.innerHeight;
        Camera.currentCamera.aspectRatio = aspect;
        Camera.gameCamera.aspectRatio = aspect;
        Camera.currentCamera.aspectRatio = aspect;

        this.cameraControle.update(Camera.editorCamera); 
        Camera.gameCamera.drawGizmos();
    }
}

