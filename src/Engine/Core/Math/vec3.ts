import { IVector3 } from "../interfaces/IVector3";
import Mathf from "./Mathf";

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
    public equals(other: Vec3, tolerance: number = 1e-6): boolean {
        return Math.abs(this.x - other.x) < tolerance &&
               Math.abs(this.y - other.y) < tolerance &&
               Math.abs(this.z - other.z) < tolerance;
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
    

    public static lerpUnclamped(start: Vec3, end: Vec3, t: number): Vec3 {
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        const z = start.z + (end.z - start.z) * t;
    
        return new Vec3(x, y, z);
    }
    public static lerp(start: Vec3, end: Vec3, t: number): Vec3 {
        t = Math.max(0, Math.min(1, t));
  
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        const z = start.z + (end.z - start.z) * t;

        return new Vec3(x, y, z);
    }

   
    public static fromArray(array: Array<number>){
        return new Vec3(array[0], array[1],array[2])
    }

    toArray(): number[] {
        return [this.x, this.y, this.z];
    }

    distanceTo(other: Vec3): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dz = this.z - other.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
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

    public static vec3ArrayToFloat32Array(v: Vec3[]): Float32Array {
        const float32Array = new Float32Array(v.length * 3);
        for (let i = 0; i < v.length; i++) {
            float32Array[i * 3] = v[i].x;
            float32Array[i * 3 + 1] = v[i].y;
            float32Array[i * 3 + 2] = v[i].z;
        }
        return float32Array;
    }

    static distance(v1: Vec3, v2: Vec3): number {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        const dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    
}
