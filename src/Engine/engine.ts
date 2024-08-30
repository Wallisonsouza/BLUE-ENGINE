// import { importer } from "../Figma/importer";
import ScryptManager from "./Managers/ScryptManager";
import Time from "./static/Time";
import Input from "./Input/Input";
import Renderer from "./graphycs/Renderer";


export default class Engine {
    private time: Time;
    private canvas: HTMLCanvasElement;
   
    fp = document.getElementById("fps") as HTMLDivElement;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        let context: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext("webgl2");

        if (!context) {
            console.warn("API WebGL2 não disponível, tentando WebGL...");

            context = canvas.getContext("webgl");

            if (!context) {
                console.error("Falha ao obter o contexto WebGL. Seu navegador pode não suportar WebGL.");
               
            } else {
                console.log("Usando WebGL como alternativa.");
            }
        } else {

            Renderer.wegl2 = context as WebGL2RenderingContext;
            console.log("Contexto WebGL2 obtido com sucesso.");
        }
        
    
        this.time = new Time(
            this.awake.bind(this),
            this.start.bind(this),
            this.update.bind(this),
            this.fixedUpdate.bind(this),
            this.lateUpdate.bind(this),
            this.onDrawGizmos.bind(this),
            this.onGUI.bind(this)
        );
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

        Renderer.wegl2.viewport(0, 0, this.canvas.width, this.canvas.height)
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

    }
       
  

 
}