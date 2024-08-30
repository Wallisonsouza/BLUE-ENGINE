// import { importer } from "../Figma/importer";
import ScryptManager from "./Managers/ScryptManager";
import Time from "./static/Time";
import WebGLLink from "./engine/webg-link";
import Input from "./Input/Input";
import EngineCache from "./Cache/EngineCache";


export default class Engine {
    private time: Time;
    private glLink: WebGLLink;
    private canvas: HTMLCanvasElement;
    fp = document.getElementById("fps") as HTMLDivElement;
    constructor(canvas: HTMLCanvasElement) {
        this.glLink = new WebGLLink(canvas);
        this.canvas = canvas;

        this.time = new Time(
            this.awake.bind(this),
            this.start.bind(this),
            this.update.bind(this),
            this.fixedUpdate.bind(this),
            this.lateUpdate.bind(this),
            this.onDrawGizmos.bind(this),
            this.onGUI.bind(this)
        );

        window.addEventListener("resize", () => {
            this.resize(window.innerWidth, window.innerHeight)
        })
        this.resize(window.innerWidth, window.innerHeight)
    }

    public initialize(){
        this.time.start();
    }

    public async loadResources(){
        
    }

    private simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    private awake(){
        ScryptManager.awake();
    }

    private start(): void {
        Input.start();
       ScryptManager.start();
    }   

    private fixedUpdate(): void {
      
    }

    private update(): void {
     
        // // const context = this.ctx;
        // // RendererManager.update(context);
        // // MouseInput.clear(); 
        // // KeyInput.clear();

        if(this.glLink.gl) {
            
            this.glLink.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
            this.glLink.gl.clearColor(0.5, 0.5, 0.5, 1)
         
        }
        
        
        this.fp.innerText = Time.fps.toString() +"FPS " +"_____"+ window.innerWidth + "x" + window.innerHeight + "px"
        ScryptManager.update()
        Input.update();
    }
    
    public pause(){
        this.time.pause();
    }

    public resume(){
        this.time.resume();
    }
    public stop(): void {
        this.time.stop();
    }

  
   
    
    private lateUpdate(): void {
        ScryptManager.lateUpdate();
    }

    private onDrawGizmos() {
       
     
    }   
   
    private onGUI() {
        // TextDrawer.resetPosition();
        // TextDrawer.drawText(`<style>{color: red, fontSize: 12}</style>Delta Time: ${Time.deltaTime}<style>{color: green}</style> ${Time.fps} FPS`);
        // TextDrawer.drawText(`<style>{color: orange, fontSize: 12}</style>Fixed Delta Time: ${Time.fixedDeltaTime} <style>{color: green}</style> ${1/Time.fixedDeltaTime} FPS`);
       
        
        // ScryptManager.onGUI();
        // `
        //     Fixed Delta Time: ${Time.fixedDeltaTime}[reset] 
        //     and 
        //     [green]
        //     ${1/Time.fixedDeltaTime} FPS
        // `
    }

    private resize(width: number, height: number){
      this.canvas.width = width;
      this.canvas.height = height;
    }
}

    
