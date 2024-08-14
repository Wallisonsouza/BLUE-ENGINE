import Component from "../engine/base_component";
import Mathf from "../static/Mathf";

type BorderRadius = { lt: number, lb: number, rt: number, rb: number };

export class Vertice {
    x: number;
    y: number;
    arc: boolean;
    radius: number;

    constructor(x: number, y: number, arc: boolean = true, radius: number = 0) {
        this.x = x;
        this.y = y;
        this.arc = arc;
        this.radius = radius;
    }
}
export default class Rect extends Component {
    private static idIncrement = 0;
    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 100;
    private _height: number = 100;
    private _rotation: number = 0;
    private _originX: number = 0.5;
    private _originY: number = 0.5;
    private _index: number = 0;
    private _path: Path2D = new Path2D();
    private vertices: Vertice[] = [];
    
    public fill: string = "white";
    public physics: boolean = true;

    constructor() {
        super();
        Rect.idIncrement++;
        this._index = Rect.idIncrement;
        this.vertices =  [
            new Vertice(0, 0,true, 20),
            new Vertice(this._width, 0,true, 20),
            new Vertice(this._width, this._height,true, 20),
            new Vertice(0, this._height, true, 20),
        ]

        this.updatePath();
    }

    private updateVertices() {
        this.vertices = [
            new Vertice(0, 0,true, 20),
            new Vertice(this._width, 0,true, 20),
            new Vertice(this._width, this._height,true, 20),
            new Vertice(0, this._height, true, 20),
        ];

        this.updatePath();
    }

    public getVertices(): Vertice[] {
       return this.vertices;
    }
    

    public updatePath(): void {

       
        this._path = new Path2D();
    
        for (let index = 0; index < this.vertices.length; index++) {
            const currentElement = this.vertices[index];
            const nextElement = this.vertices[(index + 1) % this.vertices.length];
    
            if (!currentElement.arc || currentElement.radius <= 0) {
                this._path.lineTo(currentElement.x, currentElement.y);
            } else {

                const absWidth = Mathf.abs(this._width);
                const absHeight = Mathf.abs(this._height)
                const validRadius = Mathf.getValidRadius(
                    currentElement.radius, 
                    absHeight, 
                    absWidth
                );
    
                this._path.arcTo(
                    currentElement.x, currentElement.y,
                    nextElement.x, nextElement.y,
                    validRadius
                );
            }
        }
        this._path.closePath();

        Path2D

        console.log(this._path)
    }
    public getPath() {
        return this._path;
    }

    // Getters
    public get x(): number { return this._x; }
    public get y(): number { return this._y; }
    public get width(): number { return this._width; }
    public get height(): number { return this._height; }
    public get originX(): number { return this._originX; }
    public get originY(): number { return this._originY; }
    public get rotation(): number { return this._rotation; }
    public get index(): number { return this._index; }
    public get rotatedPosition(): { x: number, y: number } {
        return Mathf.rotateAround(
            this._x, 
            this._y, 
            this._x + this._width * this._originX, 
            this._y + this._height * this._originY, 
            this._rotation
        );
    }

    // Setters
    public set x(value: number) { this._x = value; }
    public set y(value: number) { this._y = value; }
    public set width(value: number) { this._width = value; this.updateVertices()}
    public set height(value: number) { this._height = value; this.updateVertices()}
    public set originX(value: number) { this._originX = value; }
    public set originY(value: number) { this._originY = value; }
    public set rotation(value: number) { this._rotation = Mathf.clampAngle(value, -180, 180); }
    public set index(value: number) { this._index = value; }

    // Hierarchy Management
    private parent: Rect | null = null;
    private children: Rect[] = [];

    public addChild(child: Rect) {
        if (!this.children.includes(child)) {
            this.children.push(child);
            child.setParent(this);
        }
    }

    public removeChild(child: Rect) {
        const index = this.children.indexOf(child);
        if (index > -1) {
            this.children.splice(index, 1);
            child.setParent(null);
        }
    }

    public getChildren(): Rect[] {
        return this.children;
    }

    public getParent(): Rect | null {
        return this.parent;
    }

    public setParent(parent: Rect | null) {
        this.parent = parent;
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

    public getRotatedPosition() {
        return this.rotatedPosition;
    }

}
