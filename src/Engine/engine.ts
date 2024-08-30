// import { importer } from "../Figma/importer";
import ScryptManager from "./Managers/ScryptManager";
import Time from "./static/Time";
import Input from "./Input/Input";
import EngineCache from "./Cache/EngineCache";
import { Renderer } from "./graphycs/SpriteRenderer";

export default class Engine {
    private time: Time;
    private canvas: HTMLCanvasElement;
   
    fp = document.getElementById("fps") as HTMLDivElement;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        let context: WebGLRenderingContext | null = canvas.getContext("webgl2");

        if (!context) {
            console.warn("API WebGL2 não disponível, tentando WebGL...");

            context = canvas.getContext("webgl");

            if (!context) {
                console.error("Falha ao obter o contexto WebGL. Seu navegador pode não suportar WebGL.");
               
            } else {
                console.log("Usando WebGL como alternativa.");
            }
        } else {
            console.log("Contexto WebGL2 obtido com sucesso.");
        }
        
        EngineCache.gl = context;
        Renderer.wegl2 = context;

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

    public async loadResources() {
        await ScryptManager.loadResources();
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

        EngineCache.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
        this.fp.innerText = Time.fps.toString() +"FPS " +"_____"+ window.innerWidth + "x" + window.innerHeight + "px"
        ScryptManager.update();
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