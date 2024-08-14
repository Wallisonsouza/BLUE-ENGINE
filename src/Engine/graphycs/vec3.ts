import { IVector3 } from "../Core/interfaces/IVector3";
import Mathf from "../static/Mathf";

export default class Vec3 implements IVector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector: Vec3): Vec3 {
        return new Vec3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    increment(vector: Vec3): Vec3 {
        return new Vec3(this.x += vector.x, this.y += vector.y, this.z += vector.z);
    }

    subtract(vector: Vec3): Vec3 {
        return new Vec3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    divide(vector: Vec3): Vec3 {
        const x = vector.x !== 0 ? this.x / vector.x : 0;
        const y = vector.y !== 0 ? this.y / vector.y : 0;
        const z = vector.z !== 0 ? this.z / vector.z : 0;
        return new Vec3(x, y, z);
    }
    multiply(vector: Vec3): Vec3 {
        return new Vec3(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    }

    scale(scalar: number): Vec3 {
        return new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    magnitude(): number {
        return Mathf.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize(): Vec3 {
        const len = this.magnitude();
        if (len === 0) return new Vec3();
        return this.divideScalar(len);
    }

    dot(vector: Vec3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    cross(vector: Vec3): Vec3 {
        return new Vec3(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        );
    }

    divideScalar(scalar: number): Vec3 {
        if (scalar === 0) throw new Error("Division by zero");
        return new Vec3(this.x / scalar, this.y / scalar, this.z / scalar);
    }
    negative(): Vec3 {
        return new Vec3(-this.x, -this.y, -this.z);
    }


    toArray(){
        return [this.x, this.y, this.z]
    }

    public static increment(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x += b.x, a.y += b.y, a.z += b.z);
    }

    public static decrement(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x -= b.x, a.y -= b.y, a.z -= b.z);
    }
    toString(): string {
        return `Vec3(${this.x}, ${this.y}, ${this.z})`;
    }

    public static get one(): Vec3 {
        return new Vec3(1, 1, 1);
    }

    public static get forward(): Vec3 {
        return new Vec3(0, 0, 1);
    }

    public static get up(): Vec3 {
        return new Vec3(0, 1, 0);
    }

    public static get down(): Vec3 {
        return new Vec3(0, -1, 0);
    }

    public static get right(): Vec3 {
        return new Vec3(1, 0, 0);
    }

    public static get left(): Vec3 {
        return new Vec3(-1, 0, 0);
    }

    public static get zero(): Vec3 {
        return new Vec3(0, 0, 0);
    }

    public static get negativeOne(): Vec3 {
        return new Vec3(-1, -1, -1);
    }

    public static get upRight(): Vec3 {
        return new Vec3(1, 1, 0);
    }

    public static get upForward(): Vec3 {
        return new Vec3(0, 1, 1);
    }

    public static get downLeft(): Vec3 {
        return new Vec3(-1, -1, 0);
    }


    public static add(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static subtract(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    public static scale(v: Vec3, scalar: number): Vec3 {
        return new Vec3(v.x * scalar, v.y * scalar, v.z * scalar);
    }

    public static divideScalar(v: Vec3, scalar: number): Vec3 {
        if (scalar === 0) throw new Error("Division by zero");
        return new Vec3(v.x / scalar, v.y / scalar, v.z / scalar);
    }

    public static dot(a: Vec3, b: Vec3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    public static magnitude(v: Vec3): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    public static normalize(v: Vec3): Vec3 {
        const len = Vec3.magnitude(v);
        if (len === 0) return new Vec3();
        return Vec3.divideScalar(v, len);
    }

    public static cross(a: Vec3, b: Vec3): Vec3 {
        return new Vec3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    public static negate(v: Vec3): Vec3 {
        return new Vec3(-v.x, -v.y, -v.z);
    }

    public static toString(v: Vec3): string {
        return `Vec3(${v.x}, ${v.y}, ${v.z})`;
    }

    public static toFloat32Array(vecs: Vec3[]): Float32Array {
        const array = new Float32Array(vecs.length * 3);
        for (let i = 0; i < vecs.length; i++) {
            array[i * 3] = vecs[i].x;
            array[i * 3 + 1] = vecs[i].y;
            array[i * 3 + 2] = vecs[i].z;
        }
        return array;
    }
}
