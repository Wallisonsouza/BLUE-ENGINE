import Vector2 from "../../vector2";
import Component from "../engine/base_component";
import Mathf from "../static/Mathf";

export default class Transform extends Component {


    private _position: Vector2 = Vector2.zero;
    private _rotation: number = 0;
    private _origin: Vector2 = new Vector2(1, 1); 

    public fillColor: string =  "white";


    public getOrigin(): Vector2 {
        return this._origin;
    }

    public setOrigin(newOrigin: Vector2) {
        const clampedX = Mathf.clamp(newOrigin.x, 0, 1);
        const clampedY = Mathf.clamp(newOrigin.y, 0, 1);
        this._origin = new Vector2(clampedX, clampedY);
    }   

    //rgb(255, 0, 0) 
    //retorna um novo vetor com a posicao rotacionada  
    //importante retornar uma nova instancia e nao referencia direta
    public getRotatedPosition(): Vector2 {
        const origin = this._position.add(this.size.multiply(this._origin));
        return Mathf.rotateAround(this._position, origin, this.getRadians());
        
    }
    public setPosition(newPosition: Vector2){
        this._position = newPosition;
    }

    public getPosition(): Vector2 {
        return this._position;

    }

    public getDegrees(): number {
        return this._rotation;
    }

    public getRadians(): number {
        return Mathf.degToRad(this._rotation);
    }

    public setRotation(newRotation: number) {
        this._rotation = Mathf.clampAngle(newRotation, -180, 180);
    }

    public size: Vector2 = new Vector2(100, 100);
    public zIndex: number = 0;


    public toString() {
        return ` 
            position: ${this.getRotatedPosition()}
            rotation: ${this.getDegrees()}
            size: ${this.size}
            index: ${this.zIndex}
        `;
    }
    public html(): string {

        const style = `
            position: absolute;
            left: ${this.getPosition().x}px;
            top: ${this.getPosition().y}px;
            width: ${this.size.x}px;
            height: ${this.size.y}px;
            transform: rotate(${this.getDegrees()}deg);
            transform-origin: ${this._origin.x * 100}% ${this._origin.y * 100}%;
            z-index: ${this.zIndex};
            background-color: ${this.fillColor};
            border-radius: 20px;

        `;
    
        return `<div style="${style}"></div>`;
    }
}

