
import EngineCache from "./Engine/Cache/EngineCache";
import CameraController from "./Engine/CameraControler";
import Scrypt from "./Engine/components/base_mono";
import Material, { createTexture } from "./Engine/Core/Inplementations/Material";
import Shader from "./Engine/Core/Inplementations/Shader";
import Engine from "./Engine/engine";
import { KeyCode } from "./Engine/Enum/KeyCode";
import Mesh from "./Engine/graphycs/Mesh";
import MeshBuilder from "./Engine/graphycs/MeshBuilder";
import MeshRenderer, { RenderMode } from "./Engine/graphycs/MeshRenderer";
import Input from "./Engine/Input/Input";
import Time from "./Engine/static/Time";

export default class SimpleEngine extends Scrypt {

    meshRenderer: MeshRenderer;
    cubeMesh: Mesh;
    shader: Shader;
    material: Material;
    cameraControle: CameraController = new CameraController();
    triangleMesh: Mesh;


    public start(): void {
      
        // Criando uma mesh de cubo
        this.cubeMesh = MeshBuilder.createCube();
        this.cubeMesh.compile();

        // Criando o MeshRenderer
        this.meshRenderer = new MeshRenderer();
        // Atribuindo a mesh ao MeshRenderer
        this.meshRenderer.setMesh(EngineCache.meshTeste);

        // Criando um shader
        this.shader = new Shader();
        this.shader.compile();

        // Criando e configurando o material
        this.material = new Material();
        this.material.shader = this.shader;

        // Atribuindo o material ao MeshRenderer
        this.meshRenderer.material = this.material;
        this.material.texture = createTexture(EngineCache.gl, "./src/Assets/3D/Grass_Block_TEX.png"); 
    }

    public update(): void {


      
        this.meshRenderer.render();
        this.meshRenderer.renderMode = RenderMode.SOLID

        const camera = this.meshRenderer.camera;
        
        if(camera){
            camera.aspectRatio = window.innerWidth / window.innerHeight;
            this.cameraControle.update(camera, Time.deltaTime)
        }
    }
} 