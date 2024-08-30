export  default class Vec2 {

    public x: number;
    public y: number;
    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    public static get one(){
        return new Vec2(1, 1);
    }

    public toArray(){
        return [this.x, this.y]
    }

    public static vec2ArrayToFloat32Array(v: Vec2[]): Float32Array {
        const float32Array = new Float32Array(v.length * 2);
        v.forEach((v, index) => {
            float32Array[index * 2] = v.x;
            float32Array[index * 2 + 1] = v.y;
        });

        return float32Array;
    }
}