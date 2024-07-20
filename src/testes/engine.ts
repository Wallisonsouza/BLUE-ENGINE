import Input from "./static/input";
import RendererManager from "./Managers/RendererManager";
import { ScryptManager } from "../experimental/ScryptManager";

export default class Engine {

    private targetFps: number = 60;
    private endEngine: boolean = false;
    private paused: boolean = false;

    
    private fixedTime(): void {
        if (!this.endEngine && !this.paused) {
            this.fixedUpdate();
            setTimeout(this.fixedTime.bind(this), 1000 / this.targetFps);
        }
    }
    
    private fpsBasedTime(): void {

        if (!this.endEngine && !this.paused) {
            this.update();
            requestAnimationFrame(this.fpsBasedTime.bind(this));
        }
    }

    public start(): void {
        this.fpsBasedTime();
        Input.init();
    }
    
    public pause(): void { 
        this.paused = true; 
    }
    public resume(): void { 
        this.paused = false; 
        this.fpsBasedTime();
    }

    public end(): void { this.endEngine = true; }

    // Metodo chamado a cada frame
    private update(): void {
        
       RendererManager.render();
        ScryptManager.logics.forEach((logic) => {
            logic.update();
        });
    }
    // Metodo chamado a cada fixed frame
    private fixedUpdate(): void {
        console.log("Fixed Update");
        ScryptManager.logics.forEach((logic) => {
            logic.fixedUpdate();
        });
    }
}

export class EngineMessages {

    public static readonly SCENE_MANAGER = {
        NO_MANAGER: {
            ERROR: "Nenhuma cena foi encontrada no SceneManager!",
            SOLUTION: "Crie uma nova cena e a adicione ao SceneManager.",
            TARGET: "SCENE_MANAGER"
        },
        NO_CURRENT: {
            ERROR: "Nenhuma cena foi definida como cena atual!",
            SOLUTION: "Adicione uma cena ao SceneManager e defina-a como cena atual.",
            TARGET: "SCENE_MANAGER"
        },
        NO_SCENE: {
            ERROR: "Nenhuma cena foi encontrada!",
            SOLUTION: "Adicione uma cena ao SceneManager.",
            TARGET: "SCENE_MANAGER"
        },
        NO_FOUND: {
            ERROR: "Nenhuma cena foi encontrada no SceneManager!",
            SOLUTION: "Adicione uma cena ao SceneManager.",
            TARGET: "SCENE_MANAGER"
        }
    }

    public static readonly HIERARCHY = {
        NO_ENTITY: {
            TARGET: "HIERARCHY",
            ERROR: "Nenhuma entidade foi encontrada na hierarquia!",
            SOLUTION: "Adicione uma entidade à hierarquia."
        },

        NO_CAMERA: {
            TARGET: "HIERARCHY",
            ERROR: "Nenhuma câmera foi encontrada na hierarquia!",
            SOLUTION: "Adicione uma câmera à hierarquia."
        }
    }

    public static readonly ENGINE  = {
        NO_ENGINE: {
            ERROR: "Nenhuma engine foi encontrada!",
            SOLUTION: "Crie uma engine para o projeto."
        },
        END_ENGINE: {
            ERROR: "A engine foi finalizada!",
            SOLUTION: "Reinicie a engine."
        },
    }
}