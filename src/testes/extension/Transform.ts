import Vector2 from "../../vector2";
import Component from "../base/base_component";
import Mathf from "../static/Mathf";

export default class Transform extends Component {

    public get origin(): Vector2 {
        return this._origin;
    }
    public set origin(value: Vector2) {
        this._origin = value;
    }

    private _position: Vector2 = Vector2.zero;
    private _rotation: number = 0;
    private _origin: Vector2 = Vector2.zero; 

    public fillColor: string =  "white";
    
    public get position(): Vector2 {
        return this._position;
    }

    public set position(value: Vector2) {
        this._position = value;
    }

    public get rotation(): number {
        return this._rotation;
    }

    public set rotation(value: number) {
        this._rotation = Mathf.clampAngle(value, -180, 180);
    }
    public size: Vector2 = new Vector2(100, 100);
    public zIndex: number = 0;

  
    public getAdjustedPosition(): Vector2 {

        //origem
     
        const halfWidth = this.size.x * 0.0;
        const halfHeight = this.size.y * 0.0;

        const rad = Mathf.degToRad(-this._rotation);
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const offsetX = halfWidth * cos - halfHeight * sin;
        const offsetY = halfWidth * sin + halfHeight * cos;

        return new Vector2(
            this._position.x + halfWidth - offsetX,
            this._position.y + halfHeight - offsetY
        );
    }

    public toString() {
        return ` 
            position: ${this.getAdjustedPosition()}
            rotation: ${this.rotation}
            size: ${this.size}
            index: ${this.zIndex}
        `;
    }

    public html(): string {
        const adjustedPosition = this.getAdjustedPosition();
        const style = `
            position: absolute;
            left: ${adjustedPosition.x}px;
            top: ${adjustedPosition.y}px;
            width: ${this.size.x}px;
            height: ${this.size.y}px;
            transform: rotate(${-this.rotation}deg);
            transform-origin: top left;
            z-index: ${this.zIndex};
            background-color: ${this.fillColor};
            border: 1px solid #000;
            border-radius: 20px
        `;
    
        return `<div style="${style}"></div>`;
    }
    
}

