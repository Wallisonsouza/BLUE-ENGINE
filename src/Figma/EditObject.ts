import Scrypt from "../testes/base/base_mono";
import Input from "../testes/static/input";
import CreateObject from "../testes/Object/CreateObject";
import GameObject from "../testes/extension/GameObject";
import { KeyCode } from "../testes/enum/KeyCode";
import Mathf from "../testes/static/Mathf";
import CollisionData from "../testes/base/data_collision";
import MouseBorderCollider, { Border } from "../testes/extension/mouseBorderCollider";
import Vector2 from "../vector2";


export default class Editentity1ect extends Scrypt {

    private par!: GameObject;
    
    private resizeLeft: boolean = false;
    private resizeRight: boolean = false;
    private resizeTop: boolean = false;
    private inspector = document.getElementById("inspector") as HTMLDivElement;

    position: Vector2 = Vector2.zero;

    public start(): void {
        this.par  = CreateObject.square();
    }

    public update(): void {
        if (Input.getMouseButton(0)) {
            if (this.resizeRight) {
                const angleInRadians = -Mathf.degToRad(this.par.transform.rotation);
                const adjustedPosition = this.par.transform.getAdjustedPosition();
                const mouseXRelativeToObj = Input.mousePosition.x - adjustedPosition.x;
                const mouseYRelativeToObj = Input.mousePosition.y - adjustedPosition.y;
                const mouseXRotated = mouseXRelativeToObj * Math.cos(angleInRadians) + mouseYRelativeToObj * Math.sin(angleInRadians);
                const newWidth = mouseXRotated;
                this.par.transform.size.x = Math.max(newWidth, 0);
                const offsetX = (this.par.transform.size.x - newWidth) / 2;
                this.par.transform.position.x += offsetX * Math.cos(angleInRadians);
                this.par.transform.position.y += offsetX * Math.sin(angleInRadians);
            }
        }

        if(Input.getMouseButtonUp(0)){
            this.resizeRight = false;
            this.resizeLeft = false;
            this.resizeTop = false;
        }

        if(Input.getKeyDown(KeyCode.E)){
            this.par.transform.rotation -= 5; 
        }

        if(Input.getKeyDown(KeyCode.Q)){
            this.par.transform.rotation += 5; 
        }

        if(Input.getKey(KeyCode.D)){
            this.par.transform.position .x += 1;
        }

        if(Input.getKey(KeyCode.A)){
            this.par.transform.position.x -= 1; 
        }

        if(Input.getKey(KeyCode.W)){
            this.par.transform.position.y -= 1;
        }

        if(Input.getKey(KeyCode.S)){
            this.par.transform.position.y += 1; 
        }

        this.inspector.innerText = this.par.transform.toString();
        this.inspector.innerHTML += this.par.transform.html();
    }
    
    public onCollisionStay(_data: CollisionData): void {

        const border = (_data.collider as MouseBorderCollider).border;

        if(Input.getMouseButton(0)) {

            switch(border){
                case Border.inBorderLeft: 
                    this.resizeLeft = true;
                break;
                case Border.inBorderRight: 
                    this.resizeRight = true;
                break;
                case Border.inBorderTop: 
                    this.resizeTop = true;
                break;
            }
        }
       
    }
}


// console.log(Input.mouseMovement)
       
// if (Input.getKey(KeyCode.A)) {
   
// }

// if (Input.getKey(KeyCode.D)) {
//     // Aumenta a escala apenas no eixo X
//     this.par.transform.scale.x -= 1;

//     //Calcula o deslocamento na direção da rotação
//     const movementAmount = 1; // Quantidade de movimento desejada
//     const angleInRadians = Mathf.degToRad(this.par.transform.rotation); // Converte a rotação para radianos
//     const dx = movementAmount * Math.cos(angleInRadians); // Componente do deslocamento no eixo X
//     const dy = movementAmount * Math.sin(angleInRadians); // Componente do deslocamento no eixo Y

//     // Aplica o deslocamento à posição do objeto
//     this.par.transform.position.x -= dx / 2; // Divide por 2 para ajustar a velocidade
//     this.par.transform.position.y -= dy / 2; // Divide por 2 para ajustar a velocidade
// }

// if (Input.getKey(KeyCode.W)) {
//     this.par.transform.scale.y += 1;
 
// }

// if (Input.getKey(KeyCode.S)) {
//     this.par.transform.scale.y -= 1;
 
// }

// if (Input.getKeyDown(KeyCode.R)) {
//     this.par.transform.rotation +=5;
 
// }
   
// this.par.transform.rotation = 45;