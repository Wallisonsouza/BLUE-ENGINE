import { importer } from "../Figma/importer";
import KeyInput from "./Input/KeyInput";
import MouseInput from "./Input/MouseInput";
import PhysicsManager from "./Managers/PhysicsManager";
import RendererManager from "./Managers/RendererManager";
import ScryptManager from "./Managers/ScryptManager";
import EngineCache from "./Cache/EngineCache";
import Time from "./static/Time";
import Draw, {TextDrawer, TextStyle } from "./components/Draw";
import SceneManager from "./Managers/SceneManager";
import WebGLLink from "./graphycs/webg-link";
import Color from "./static/color";
import Vec3 from "./graphycs/vec3";
import Input from "./Input/Input";
import { KeyCode } from "./Enum/KeyCode";
import Quat from "./graphycs/quat";




export default class Engine {
    private time: Time;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
  
        this.time = new Time(
            this.update.bind(this), 
            this.fixedUpdate.bind(this), 
            this.lateUpdate.bind(this),
            this.onDrawGizmos.bind(this),
            this.onGUI.bind(this)
        );

        this.glLink = new WebGLLink(canvas);
        this.canvas = canvas;

        window.addEventListener("resize", () => {
            this.resize(window.innerWidth, window.innerHeight)
        })
        this.resize(window.innerWidth, window.innerHeight)
        
        Input.start();
   
    }

    public start(): void {
        this.time.start();
        // importer();
        // MouseInput.initialize();
        // KeyInput.initialize();
        // ScryptManager.start();
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

    private fixedUpdate(): void {
        // ScryptManager.fixedUpdate();
        // PhysicsManager.fixedUpdate();
    }

    private update(): void {
        // ScryptManager.update();
        // const context = this.ctx;
        // RendererManager.update(context);
        // MouseInput.clear();
        // KeyInput.clear();

        if(this.glLink.gl) {

            this.rot++
            this.glLink.gl.viewport(0, 0, window.innerWidth, window.innerHeight);
            this.glLink.camera.aspectRatio = this.canvas.width / this.canvas.height;
            this.glLink.gl.clearColor(0, 0, 0, 1)
            this.glLink.gl.clear(this.glLink.gl.COLOR_BUFFER_BIT)

        
            this.glLink.transform.rotation = Quat.toQuat(new Vec3(0, this.rot, 0));
            this.glLink.material.color = Color.white;
            this.glLink.drawFillRect()

            this.glLink.transform.rotation = Quat.identity;
            this.glLink.material.color = Color.red;
            this.glLink.drawFillRect(2)
           
            this.glLink.drawLine(new Vec3(0, 0,0), new Vec3(0, 10, 10))
           

            console.log(Time.fps)
           
            if(Input.getMouseButton(1)) {
                const delta = Input.getMouseMovement();
                this.cameraRotation.y -= delta.x * this.rotationSpeed;
                this.cameraRotation.x += delta.y * this.rotationSpeed;

                const oldRotation = this.glLink.camera.transform.rotation;
                const rotation = Quat.toQuat(this.cameraRotation);
                this.glLink.camera.transform.rotation = Quat.slerp(oldRotation, rotation,Time.deltaTime * 6)
            }

            if(Input.getKey(KeyCode.W)) {
                const dir = this.glLink.camera.transform.getForwardDirection()
                this.glLink.camera.transform.translate(Vec3.scale(dir, this.movementSpeed))
            }
            if(Input.getKey(KeyCode.S)) {
                const dir = this.glLink.camera.transform.getBackwardDirection()
                this.glLink.camera.transform.translate(Vec3.scale(dir, this.movementSpeed))
            }
            if(Input.getKey(KeyCode.D)) {
                const dir = this.glLink.camera.transform.getLefttDirection()
                this.glLink.camera.transform.translate(Vec3.scale(dir, this.movementSpeed))
            }
            if(Input.getKey(KeyCode.A)) {
                const dir = this.glLink.camera.transform.getRightDirection()
                this.glLink.camera.transform.translate(Vec3.scale(dir, this.movementSpeed))
            }
        }
        
        Input.update();
    }

    private lateUpdate(): void {
        ScryptManager.lateUpdate();
    }

    private onDrawGizmos() {
        ScryptManager.onDrawGizmos();
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

    private glLink: WebGLLink;
    private canvas: HTMLCanvasElement;
    private rot= 0;

 

    private resize(width: number, height: number){
      this.canvas.width = width;
      this.canvas.height = height;
    }


    private movementSpeed = 0.1;
    private rotationSpeed = 0.1;

    private cameraRotation: Vec3 = Vec3.zero;

   
   
}