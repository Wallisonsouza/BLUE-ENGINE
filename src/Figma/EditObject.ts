import Rect from "../Engine/components/Rect";
import GameObject from "../Engine/components/GameObject";
import Scrypt from "../Engine/engine/base_mono";
import Input from "../Engine/Input/Input";
import CreateObject from "../Engine/renderer/CreateObject";
import Mathf from "../Engine/static/Mathf";
import { EKey } from "../Engine/Input/EKey";
import Drawn from "../Engine/components/Drawn";
import { VisualRect } from "./VisualRect";

export default class EditEntity extends Scrypt {

    private targetObject!: GameObject;
    private inspectorElement: HTMLDivElement;
    private textElement: HTMLDivElement;
    private isDragging: boolean = false;

    private right: boolean = false;
    private left: boolean = false;
    private top: boolean = false;
    private bottom: boolean = false;


    private updateRect: Rect;

    constructor() {
        super();
    }

    public override start(): void {
        this.initializeTargetObject();
    }

    public override update(deltaTime: number): void {
        const mousePosition = Input.mousePosition;
        const rotatedPos = this.targetObject.rect.rotatedPosition;
        const border = this.checkBorder(mousePosition.x, mousePosition.y, rotatedPos.x, rotatedPos.y, this.targetObject.rect.width, this.targetObject.rect.height, this.targetObject.rect.rotation, 15);
        
        this.handleMouseInput(border);
        this.handleKeyInput();

        if (this.isDragging && !this.right && !this.left && !this.top && !this.bottom) {
            const delta = Input.mouseDelta;
            this.targetObject.rect.x += delta.x;
            this.targetObject.rect.y += delta.y;
        }

        if(this.updateRect) {
          VisualRect.updateValues(this.updateRect);
        }
    }

    private initializeTargetObject(): void {
        this.targetObject = CreateObject.square();
        this.targetObject.rect.index = 999;
    }

    private handleMouseInput(border: any): void {
        if (border.onRightEdge && Input.getMouseButtonDown(0)) {
            this.right = true;
        }
        if (border.onLeftEdge && Input.getMouseButtonDown(0)) {
            this.left = true;
        }
        if (border.onTopEdge && Input.getMouseButtonDown(0)) {
            this.top = true;
        }
        if (border.onBottomEdge && Input.getMouseButtonDown(0)) {
            this.bottom = true;
        }

        const delta = Input.mouseDelta;
        const rotatedMouse = Mathf.rotatePoint(delta.x, delta.y, -this.targetObject.rect.rotation);

        if (this.right && Input.getMouseButton(0)) {
            this.resizeRight(this.targetObject.rect, rotatedMouse.x);
        }
        if (this.left && Input.getMouseButton(0)) {
            this.resizeLeft(this.targetObject.rect, rotatedMouse.x);
        }
        if (this.top && Input.getMouseButton(0)) {
            this.resizeTop(this.targetObject.rect, rotatedMouse.y);
        }
        if (this.bottom && Input.getMouseButton(0)) {
            this.resizeBottom(this.targetObject.rect, rotatedMouse.y);
        }

        if (Input.getMouseButtonUp(0)) {
            this.isDragging = false;
            this.right = false;
            this.left = false;
            this.top = false;
            this.bottom = false;
        }
    }

    private handleKeyInput(): void {
        if (Input.getKey(EKey.Q)) { 
            this.targetObject.rect.rotation -= 1;
        }
        if (Input.getKey(EKey.E)) { 
            this.targetObject.rect.rotation += 1;
        }
    }

    private resizeLeft(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.width -= value;
        const positionAfter = rect.rotatedPosition;

        rect.x += positionAfter.x - positionBefore.x;
        rect.y += positionAfter.y - positionBefore.y;
        rect.x += value;
    }

    private resizeRight(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.width += value;
        const positionAfter = rect.rotatedPosition;
        rect.x -= positionAfter.x - positionBefore.x;
        rect.y -= positionAfter.y - positionBefore.y;
    }

    private resizeTop(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.height -= value;
        const positionAfter = rect.rotatedPosition;
        rect.y += value;
        rect.x += positionAfter.x - positionBefore.x;
        rect.y += positionAfter.y - positionBefore.y;
    }

    private resizeBottom(rect: Rect, value: number): void {
        const positionBefore = rect.rotatedPosition;
        rect.height += value;
        const positionAfter = rect.rotatedPosition;
        rect.y -= positionAfter.y - positionBefore.y;
        rect.x -= positionAfter.x - positionBefore.x;
    }

    private checkBorder(mouseX: number, mouseY: number, x: number, y: number, width: number, height: number, rotation: number, offset: number) {
        const translatedPositionX = mouseX - x;
        const translatedPositionY = mouseY - y;
        const rotatedPosition = Mathf.rotatePoint(translatedPositionX, translatedPositionY, -rotation); 
        const finalPositionX = x + rotatedPosition.x;
        const finalPositionY = y + rotatedPosition.y;

        const left = x - offset;
        const right = x + width + offset;
        const top = y - offset;
        const bottom = y + height + offset;
        
        const onLeftEdge = finalPositionX >= left && finalPositionX <= x + offset && finalPositionY >= y && finalPositionY <= bottom;
        const onRightEdge = finalPositionX <= right && finalPositionX >= x + width - offset && finalPositionY >= y && finalPositionY <= bottom;
        const onTopEdge = finalPositionY >= top && finalPositionY <= y + offset && finalPositionX >= x && finalPositionX <= right;
        const onBottomEdge = finalPositionY <= bottom && finalPositionY >= y + height - offset && finalPositionX >= x && finalPositionX <= right;

        this.targetObject.rect.fill = (onLeftEdge || onRightEdge || onTopEdge || onBottomEdge) ? "red" : "white";

        return {
            onLeftEdge,
            onRightEdge,
            onTopEdge,
            onBottomEdge
        };
    }

    public onMouseStay(entity: GameObject): void {
        if(Input.getMouseButton(0)) {
            this.isDragging = true;
          
        }

        if(Input.getMouseButtonDown(0)) {
            this.updateRect = entity.rect;
            VisualRect.setRect(entity.rect);
        }
    }
}
