import Rect from "../Engine/components/Rect";
import GameObject from "../Engine/components/GameObject";
import Scrypt from "../Engine/engine/base_mono";
import Input from "../Engine/Input/Input";
import CreateObject from "../Engine/renderer/CreateObject";
import Mathf from "../Engine/static/Mathf";
import { EKey } from "../Engine/Input/EKey";
import HtmlReferences from "../Engine/static/HtmlReferences";
export default class EditEntity extends Scrypt {

    private targetObject: GameObject;
    private isDragging: boolean = false;
    private border: Border = Border.NONE;


    private mouseButtonDown0: boolean = false;
    private image: GameObject;
    public start(): void {
       
        CreateObject.square("green");
        // CreateObject.square("red");
        this.image = CreateObject.image("src/Assets/Images/arrows.svg");
        this.image.active = false;
        this.image.rect.physics = false;
    }

    public update(deltaTime: number): void {   
        
        this.processInputs();
        if(this.targetObject) {
            const mousePosition = Input.getMousePosition();
            this.border = RectUtilitys.checkBorder(mousePosition.x, mousePosition.y,this.targetObject.rect, 8);
            
            switch(this.border) {
                case Border.LeftTop:
                    this.image.rect.rotation = this.targetObject.rect.rotation + 45;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                case Border.RightTop:
                    this.image.rect.rotation = this.targetObject.rect.rotation - 45;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                case Border.LeftBottom:
                    this.image.rect.rotation = this.targetObject.rect.rotation - 45;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                case Border.RIGHT_BOTTOM:
                    this.image.rect.rotation = this.targetObject.rect.rotation + 45;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                break
                case Border.RIGHT:
                    this.image.rect.rotation = this.targetObject.rect.rotation + 0;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                case Border.LEFT:
                    this.image.rect.rotation = this.targetObject.rect.rotation + 0;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                case Border.TOP:
                    this.image.rect.rotation = this.targetObject.rect.rotation + 90;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                case Border.BOTTOM:
                    this.image.rect.rotation = this.targetObject.rect.rotation + 90;
                    this.image.rect.x = mousePosition.x - this.image.rect.width/2;
                    this.image.rect.y = mousePosition.y- this.image.rect.height/2;
                    this.image.active = true;
                    break;
                default:
                    this.image.active = false;
                    break;
            }

            if(Input.getMouseButton(0)) {
    
                const delta = Input.getMouseMovement();
                const rotatedMouse = Mathf.rotatePoint(delta.x, delta.y, -this.targetObject.rect.rotation);
    
                switch(this.border) {
                    case Border.LeftTop:
                        RectUtilitys.resizeLeft(this.targetObject.rect, rotatedMouse.x);
                        RectUtilitys.resizeTop(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.RightTop:
                        RectUtilitys.resizeRight(this.targetObject.rect, rotatedMouse.x);
                        RectUtilitys.resizeTop(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.LeftBottom:
                        RectUtilitys.resizeLeft(this.targetObject.rect, rotatedMouse.x);
                        RectUtilitys.resizeBottom(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.RIGHT_BOTTOM:
                        RectUtilitys.resizeRight(this.targetObject.rect, rotatedMouse.x);
                        RectUtilitys.resizeBottom(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.LEFT:
                        RectUtilitys.resizeLeft(this.targetObject.rect, rotatedMouse.x);
                        break;
                    case Border.RIGHT:
                        RectUtilitys.resizeRight(this.targetObject.rect, rotatedMouse.x);
                        break;
                    case Border.TOP:
                        RectUtilitys.resizeTop(this.targetObject.rect, rotatedMouse.y);
                        break;
                    case Border.BOTTOM:
                        RectUtilitys.resizeBottom(this.targetObject.rect, rotatedMouse.y);
                        break;
                }
            }
    
            if (this.isDragging) {
                const delta = Input.getMouseMovement();
                this.targetObject.rect.x += delta.x;
                this.targetObject.rect.y += delta.y;
            }
            HtmlReferences.getRectValues(this.targetObject.rect);
    
            if (Input.getMouseButtonUp(0)) {
                this.isDragging = false;
                this.border = Border.NONE;
                this.mouseButtonDown0 = false;
            }
        }
    }

    private processInputs(){
        if(Input.getMouseButtonDown(0)){
            this.mouseButtonDown0 = true;
        }

        if(Input.getKeyDown(EKey.E)){
            this.targetObject.rect.rotation +=  15;
        }

        if(Input.getKeyDown(EKey.Q)){
            this.targetObject.rect.rotation -=  15;
        }
    }

    public onMouseStay(entity: GameObject): void {
        if(this.mouseButtonDown0){
            this.isDragging = true;
            this.targetObject = entity;
            HtmlReferences.setRectValues(entity.rect);
            HtmlReferences.interface.inspectorTitle.innerText = entity.name;
            this.mouseButtonDown0 = false;
        }
    }
}


















class RectUtilitys {
    public static resizeLeft(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.width -= value;
        const positionAfter = rect.rotatedPosition;
        rect.x += positionAfter.x - positionBefore.x;
        rect.y += positionAfter.y - positionBefore.y;
        rect.x += value;
    }

    public static resizeRight(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.width += value;
        const positionAfter = rect.rotatedPosition;
        rect.x -= positionAfter.x - positionBefore.x;
        rect.y -= positionAfter.y - positionBefore.y;
    }

    public static resizeTop(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.height -= value;
        const positionAfter = rect.rotatedPosition;
        rect.x += positionAfter.x - positionBefore.x;
        rect.y += positionAfter.y - positionBefore.y;
        rect.y += value;
    }

    public static resizeBottom(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.height += value;
        const positionAfter = rect.rotatedPosition;
        rect.y -= positionAfter.y - positionBefore.y;
        rect.x -= positionAfter.x - positionBefore.x;
    }

    public static checkBorder(
        mouseX: number, 
        mouseY: number, 
        rect: Rect,
        offset: number, 
    
    ): Border {

        const rotatedRect = rect.getRotatedPosition();
        const edge = rect.getEdges();

        const translatedPositionX = mouseX - rotatedRect.x;
        const translatedPositionY = mouseY - rotatedRect.y;

        const rotatedPosition = Mathf.rotatePoint(translatedPositionX, translatedPositionY, -rect.rotation); 
        const finalPositionX = rotatedRect.x + rotatedPosition.x;
        const finalPositionY = rotatedRect.y + rotatedPosition.y;
      
        const onTopEdge = finalPositionY >= edge.top - offset
        && finalPositionY <= rotatedRect.y + offset
        && finalPositionX >= (rect.width < 0 ? edge.right : rotatedRect.x)
        && finalPositionX <= (rect.width < 0 ? rotatedRect.x : edge.right);

        const onBottomEdge = finalPositionY <= edge.bottom + offset
        && finalPositionY >= rotatedRect.y + rect.height - offset
        && finalPositionX >= (rect.width < 0 ? edge.right : rotatedRect.x)
        && finalPositionX <= (rect.width < 0 ? rotatedRect.x : edge.right);

        const onLeftEdge = finalPositionX >= edge.left - offset && 
        finalPositionX <= rotatedRect.x + offset 
        && finalPositionY >= (rect.height < 0 ? edge.bottom : rotatedRect.y)
        && finalPositionY <= (rect.height < 0 ? rotatedRect.y : edge.bottom);

        const onRightEdge = finalPositionX <= edge.right + offset
        && finalPositionX >= rotatedRect.x + rect.width - offset
        && finalPositionY >= (rect.height < 0 ? edge.bottom : rotatedRect.y)
        && finalPositionY <= (rect.height < 0 ? rotatedRect.y : edge.bottom);
        
        if(onLeftEdge && onTopEdge) return Border.LeftTop;
        if(onRightEdge && onTopEdge) return Border.RightTop;
        if(onLeftEdge && onBottomEdge) return Border.LeftBottom;
        if(onRightEdge && onBottomEdge) return Border.RIGHT_BOTTOM;

        if (onLeftEdge) return Border.LEFT;
        if (onRightEdge) return Border.RIGHT;
        if (onTopEdge) return Border.TOP;
        if (onBottomEdge) return Border.BOTTOM;
    
        return Border.NONE;
    }
}

export enum Border {
    LEFT,
    RIGHT,
    TOP,
    BOTTOM,
    LeftTop,
    RightTop,
    LeftBottom,
    RIGHT_BOTTOM,
    NONE
}