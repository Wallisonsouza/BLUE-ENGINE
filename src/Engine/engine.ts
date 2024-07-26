import Input from "./Input/Input";
import RendererManager from "./Managers/RendererManager";
import ScryptManager from "./Managers/ScryptManager";
import Time from "./static/Time";

export default class Engine {

    private targetFps: number = 60;
    private endEngine: boolean = false;
    private paused: boolean = false;
    private lastTime: number = 0;

    private fixedTime(): void {
        if (!this.endEngine && !this.paused) {
            this.fixedUpdate();
            setTimeout(this.fixedTime.bind(this), 1000 / this.targetFps);
        }
    }
    
    private fpsBasedTime(): void {
        if (!this.endEngine && !this.paused) {
            const now = performance.now();
            const deltaTime = (now - this.lastTime) / 1000;
            this.lastTime = now;
            Time.setDeltaTime(deltaTime);
            Time.setTime(now);
            this.update(deltaTime);
            requestAnimationFrame(this.fpsBasedTime.bind(this));
        }
    }

    public start(): void {
        ScryptManager.scrypts.forEach(scrypt => {
            scrypt.start();
        })
        this.lastTime = performance.now();
        this.fpsBasedTime();
        this.fixedTime();
        Input.initialize();
       
    }
    
    public pause(): void { 
        this.paused = true; 
    }
    public resume(): void { 
        this.paused = false; 
        this.lastTime = performance.now(); 
        this.fpsBasedTime();
    }

    public end(): void { 
        this.endEngine = true; 
    }

    // Metodo chamado a cada frame
    private update(deltaTime: number): void {
        RendererManager.render();
        ScryptManager.scrypts.forEach((logic) => {
            logic.update(deltaTime);
        });

        Input.update();
    }

    // Metodo chamado a cada fixed frame
    private fixedUpdate(): void {
        
        ScryptManager.scrypts.forEach((logic) => {
            logic.fixedUpdate();
        });

       
    }
}