import Rect from "../Engine/components/Rect";
import GameObject from "../Engine/components/GameObject";
import Scrypt from "../Engine/engine/base_mono";
import Input from "../Engine/Input/Input";
import CreateObject from "../Engine/static/CreateObject";
import Mathf from "../Engine/static/Mathf";
import { KeyCode } from "../Engine/Enum/KeyCode";
import { Border } from "../Engine/Enum/Border";
import RectUtilities from "../Engine/static/RectUtilities";

export default class EditEntity extends Scrypt {

    private targetObject: GameObject;
    private isDragging: boolean = false;
    private border: Border = Border.None;

    private mouseButtonDown0: boolean = false;

    private isResizing: boolean = false;
    private incrementX = 0;
    private incrementY = 0;
    public start(): void {
        const object = CreateObject.square();
       
    }

    public update(): void { 
        const mousePosition = Input.getMousePosition();
        this.processInputs();

        if(this.targetObject) {
            if(Input.getMouseButtonDown(0)){
                this.border = RectUtilities.checkBorder(mousePosition.x, mousePosition.y,this.targetObject.rect, 8);
            }
            
            if(Input.getMouseButton(0)) {
    
                const delta = Input.getMouseMovement();
                const rotatedMouse = Mathf.rotatePoint(delta.x, delta.y, -this.targetObject.rect.rotation);
    
                switch(this.border) {

                    case Border.LeftTop:
                        this.isResizing = true;
                        RectUtilities.resizeLeft(this.targetObject.rect, rotatedMouse.x);
                        RectUtilities.resizeTop(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.RightTop:
                        this.isResizing = true;
                        RectUtilities.resizeRight(this.targetObject.rect, rotatedMouse.x);
                        RectUtilities.resizeTop(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.LeftBottom:
                        this.isResizing = true;
                        RectUtilities.resizeLeft(this.targetObject.rect, rotatedMouse.x);
                        RectUtilities.resizeBottom(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.RightBottom:
                        this.isResizing = true;
                        RectUtilities.resizeRight(this.targetObject.rect, rotatedMouse.x);
                        RectUtilities.resizeBottom(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.Left:
                        this.isResizing = true;
                        RectUtilities.resizeLeft(this.targetObject.rect, rotatedMouse.x);
                        break;
                    case Border.Right:
                        this.isResizing = true;
                        RectUtilities.resizeRight(this.targetObject.rect, rotatedMouse.x);
                        break;
                    case Border.Top:
                        this.isResizing = true;
                        RectUtilities.resizeTop(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.Bottom:
                        this.isResizing = true;
                        RectUtilities.resizeBottom(this.targetObject.rect, rotatedMouse.y);
                        break;
                    default:
                        this.isResizing = false;
                        break;
                }
            }
           
            if (this.isDragging && this.border === Border.None) {
                const delta = Input.getMouseMovement();
                this.targetObject.rect.x += delta.x;
                this.targetObject.rect.y += delta.y;
            }

            // HtmlReferences.getRectValues(this.targetObject.rect);
    
            if (Input.getMouseButtonUp(0)) {
                this.isDragging = false;
                this.isResizing = false;
                this.border = Border.None;
                this.mouseButtonDown0 = false;
            }
        }
    }

    private processInputs(){
        if(Input.getMouseButtonDown(0)){
            this.mouseButtonDown0 = true;
        }

        if(Input.getKeyDown(KeyCode.E)){
            this.targetObject.rect.rotation +=  15;
        }

        if(Input.getKeyDown(KeyCode.Q)){
            this.targetObject.rect.rotation -=  15;
        }
    }

    public onMouseStay(entity: GameObject): void {
        if(this.mouseButtonDown0){
            this.isDragging = true;
            this.targetObject = entity;
            // HtmlReferences.setRectValues(entity.rect);
            // HtmlReferences.interface.inspectorTitle.innerText = entity.name;
            this.mouseButtonDown0 = false;
        }
    }

    public onGUI(): void {

        if(this.targetObject) {
         
          
        }
       
    }
}