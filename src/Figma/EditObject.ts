import Scrypt from "../testes/engine/base_mono";
import CreateObject from "../testes/Object/CreateObject";
import GameObject from "../testes/components/GameObject";
import Mathf from "../testes/static/Mathf";
import CollisionData from "../testes/engine/data_collision";
import MouseBorderCollider, { Border } from "../testes/components/mouseBorderCollider";
import Vector2 from "../vector2";
import Transform from "../testes/components/Transform";
import MouseCollider from "../testes/components/ColliderMouse";
import Input from "../testes/static/input";


export default class Editentity1ect extends Scrypt {

    private par!: GameObject;
    
    private border: Border = Border.none;
    private inspector = document.getElementById("inspector") as HTMLDivElement;
    private text = document.getElementById("textarea") as HTMLDivElement;

    //offsets
    position: Vector2 = Vector2.zero;
    rotation: number = 0;
    rotationOffset: number = 15;
    private draggin: boolean = false;

    public start(): void {
        this.par = CreateObject.square();
        this.par.transform.zIndex = 999;
        this.position = this.par.transform.getRotatedPosition();
        this.rotation = this.par.transform.getDegrees();
    }
    
    public update(_deltaTime: number): void {

      
        if (Input.getMouseButton(0)) {

            switch(this.border) {
                case Border.inBorderRight:
                    this.resizeRight(this.par.transform);
                    break;
                case Border.inBorderBottom:
                    this.resizeBottom(this.par.transform);
                    break;
            }
        }

        if(Input.getMouseButtonUp(0)){
            this.border = Border.none;
            this.draggin = false;
        }
       
        this.text.innerText = this.par.transform.toString();
        this.inspector.innerHTML = this.par.transform.html();

        if(this.draggin){
            this.par.transform.setPosition(Input.getMousePosition().subtract(this.par.transform.size.multiplyScalar(0.5)));
        
        }
    }
    

    private resizeRight(transform: Transform) {
        const angleInRadians = transform.getRadians();
        const position = transform.getRotatedPosition();
        const mousePosition = Input.getMousePosition();
        const mouseRelative = Vector2.subtract(mousePosition, position);
        let mouseXRotated = Mathf.rotatePoint(mouseRelative, -angleInRadians).x;
        mouseXRotated = Mathf.clamp(mouseXRotated, 0, Mathf.INFINITY);
        transform.size.x = mouseXRotated;
        const positionAfterResize = transform.getRotatedPosition();
        const newPos = transform.getPosition();
        newPos.increment(position.subtract(positionAfterResize));
        transform.setPosition(newPos);
    }

    private resizeBottom(transform: Transform) {
        const position = transform.getRotatedPosition();
        const angleInRadians = transform.getRadians();
     
        const mouseRelative = Input.getMousePosition().subtract(position);
        let mouseYRotated = Mathf.rotatePoint(mouseRelative, -angleInRadians).y;
        mouseYRotated = Mathf.clamp(mouseYRotated, 0, Mathf.INFINITY);
        transform.size.y = mouseYRotated;
        const positionAfterResize = transform.getRotatedPosition();
        const newPos = transform.getPosition();
        newPos.increment(position.subtract(positionAfterResize));
        transform.setPosition(newPos);
    }

    public onCollisionStay(_data: CollisionData): void {
        
        if(_data.collider instanceof MouseBorderCollider ) {
            if(_data.collider.border === Border.none || Input.getMouseButtonDown(0)) {
                this.border = _data.collider.border;
            }
        }

        else if(_data.collider instanceof MouseCollider) {
            if(Input.getMouseButtonDown(0)) {
                this.draggin = true;
            }
           
        }
    }
}