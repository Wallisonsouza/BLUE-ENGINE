import { importer } from "../Figma/importer";
import Input from "./Input/Input";
import KeyInput from "./Input/KeyInput";
import MouseInput from "./Input/MouseInput";
import PhysicsManager from "./Managers/PhysicsManager";
import RendererManager from "./Managers/RendererManager";
import ScryptManager from "./Managers/ScryptManager";
import Time from "./static/Time";

export default class Engine {
    private time: Time;
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.time = new Time(
            this.update.bind(this), 
            this.fixedUpdate.bind(this), 
            this.lateUpdate.bind(this)
        );
    }

    public start(): void {
        this.time.start();
        importer();
        MouseInput.initialize(this.ctx.canvas);
        KeyInput.initialize();
        ScryptManager.start();
    }

    public stop(): void {
        this.time.stop();
    }

    private fixedUpdate(deltaTime: number): void {
        ScryptManager.fixedUpdate();
        PhysicsManager.fixedUpdate();
    }

    private update(deltaTime: number): void {
        ScryptManager.update(deltaTime);
        RendererManager.update(this.ctx, deltaTime);
        MouseInput.update();
        KeyInput.update();
    }

    private lateUpdate(deltaTime: number): void {
      
    }
}
