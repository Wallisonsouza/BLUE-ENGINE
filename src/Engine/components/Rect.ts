import Component from "../engine/base_component";
import Mathf from "../static/Mathf";
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
    public fill: string = "transparent";
    public borderRadius: BorderRadius = { lt: 20, lb: 20, rt: 20, rb: 20 };
    public physics: boolean = true;

    public get x(): number {
        return this._x;
    }
    public get y(): number {
        return this._y;
    }
    public get width(): number {
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

    public getEdges(): { top: number, right: number, bottom: number, left: number } {
        const { x, y } = this.rotatedPosition;
        return {
            top: y,
            right: x + this._width,
            bottom: y + this._height,
            left: x
        };
    }
    public getRotatedPosition(){
        return this.rotatedPosition;
    }
}

