import Vector2 from "../../vector2";
import Component from "../engine/base_component";
import Mathf from "../static/Mathf";
import Camera from "./Camera";
type BorderRadius = { lt: number, lb: number, rt: number, rb: number };
export default class Rect extends Component {

    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 100;
    private _height: number = 100;
    private _rotation: number = 0;
    private _originX: number = 0.5;
    private _originY: number = 0.5;
    private _index: number = 0;
    public fill: string = "white";
    public borderRadius: BorderRadius = { lt: 0, lb: 0, rt: 0, rb: 0 };

    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }
    public get width(): number {
        const positionBefore = this.rotatedPosition;
        // this.width += value;
        // const positionAfter = this.rotatedPosition;
        // this.x -= positionAfter.x - positionBefore.x;
        // this.y -= positionAfter.y - positionBefore.y;
        return this._width;
    }
    public get height(): number {
        return this._height;
    }
    public get originX(): number {
        return this._originX;
    }
    public get originY(): number {
        return this._originY;
    }
    public get rotation(): number {
        return this._rotation;
    }
    public get index(): number {
        return this._index;
    }



    public set x(value: number) {
        this._x = value;
    }
    public set y(value: number) {
        this._y = value;
    }
    public set width(value: number) {
       this._width = value;
    }
    public set height(value: number) {
        this._height = value;
    }
    public set originX(value: number) {
        this._originX = value;
    }
    public set originY(value: number) {
        this._originY = value;
    }
    public set rotation(value: number) {
        this._rotation = Mathf.clampAngle(value, -180, 180);
    }

    public set index(value: number){
        this._index = value;
    }
    
    public get rotatedPosition(): { x: number, y: number } {
        return Mathf.rotateAround(
            this._x, 
            this._y, 
            this._x + this._width * this._originX, 
            this._y + this._height * this._originY, 
            this._rotation
        );
    }
    
    /**
     * Verifica se um ponto está dentro do retângulo
     * @param x -A posicao do ponto x
     * @param y -A posicao do ponto y
     * @returns true se o ponto estiver dentro do retângulo
     */
    public contains(x: number, y: number, camera: Camera): boolean {

        const positionOffset = this.rotatedPosition;
        const translatedX = x - positionOffset.x;
        const translatedY = y - positionOffset.y;
        const rotated = Mathf.rotatePoint(translatedX, translatedY, -this.rotation);
        const finalX = rotated.x + positionOffset.x;
        const finalY = rotated.y + positionOffset.y;
       
        return (
            finalX >= positionOffset.x &&
            finalX <= positionOffset.x + this.width &&
            finalY >= positionOffset.y &&
            finalY <= positionOffset.y + this.height
        );
    }

    public toString() {
        return ` 
            position: {x: ${this.x}, y: ${this.y}}
            rotation: ${this.rotation}deg
            size: {width: ${this.width},  height: ${this.height}}
            index: ${this.index}
        `;
    }
    public html(): string {

        const style = `
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.width}px;
            height: ${this.height}px;
            transform: rotate(${this.rotation}deg);
            transform-origin: ${this.originX * 100}% ${this.originY * 100}%;
            z-index: ${this.index};
            border-radius: 20px;
            background-color: #${this.fill};
        `;
    
        return `<div style="${style}"></div>`;
    }
    
}

