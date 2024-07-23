import Vector2 from "../../vector2";

export default class Mathf {

    public static readonly INFINITY = Infinity;
    public static readonly PI = Math.PI;
    public static readonly PI2 = Math.PI * 2;
    public static readonly PI_HALF = Math.PI / 2;
    public static readonly PI_QUARTER = Math.PI / 4;
    public static readonly RAD2DEG = 180 / Math.PI;
    public static readonly DEG2RAD = Math.PI / 180;
   
    public static abs(x: number): number {
        return Math.abs(x);
    }
    public static acos(x: number): number {
        return Math.acos(x);
    }
    public static asin(x: number): number {
        return Math.asin(x);
    }
    public static atan(x: number): number {
        return Math.atan(x);
    }
    public static atan2(y: number, x: number): number {
        return Math.atan2(y, x);
    }
    public static ceil(x: number): number {
        return Math.ceil(x);
    }
    public static cos(x: number): number {
        return Math.cos(x);
    }
    public static exp(x: number): number {
        return Math.exp(x);
    }
    public static floor(x: number): number {
        return Math.floor(x);
    }
    public static log(x: number): number {
        return Math.log(x);
    }
    public static max(...values: number[]): number {
        return Math.max(...values);
    }
    public static min(...values: number[]): number {
        return Math.min(...values);
    }
    public static pow(x: number, y: number): number {
        return Math.pow(x, y);
    }
    public static random(): number {
        return Math.random();
    }
    public static round(x: number): number {
        return Math.round(x);
    }
    public static sin(x: number): number {
        return Math.sin(x);
    }
    public static sqrt(x: number): number {
        return Math.sqrt(x);
    }
    public static tan(x: number): number {
        return Math.tan(x);
    }
    public static clz32(x: number): number {
        return Math.clz32(x);
    }
    public static imul(x: number, y: number): number {
        return Math.imul(x, y);
    }
    public static sign(x: number): number {
        return Math.sign(x);
    }
    public static log10(x: number): number {
        return Math.log10(x);
    }
    public static log2(x: number): number {
        return Math.log2(x);
    }
    public static log1p(x: number): number {
        return Math.log1p(x);
    }
    public static expm1(x: number): number {
        return Math.expm1(x);
    }
    public static cosh(x: number): number {
        return Math.cosh(x);
    }
    public static sinh(x: number): number {
        return Math.sinh(x);
    }
    public static tanh(x: number): number {
        return Math.tanh(x);
    }
    public static acosh(x: number): number {
        return Math.acosh(x);
    }
    public static asinh(x: number): number {
        return Math.asinh(x);
    }
    public static atanh(x: number): number {
        return Math.atanh(x);
    }
    public static hypot(...values: number[]): number {
        return Math.hypot(...values);
    }
    public static trunc(x: number): number {
        return Math.trunc(x);
    }
    public static fround(x: number): number {
        return Math.fround(x);
    }
    public static cbrt(x: number): number {
        return Math.cbrt(x);
    }

    public static angleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

   

    public static clampAngle(angle: number, min: number, max: number): number {
        const normalizedAngle = ((angle % 360) + 360) % 360;
        const range = max - min;
        return (normalizedAngle - min) % range + min;
    }

    /**
     *  Converte radianos para graus
     * @param radians - Radianos
     * @returns - O valor convertido em graus
     */
    public static radToDeg(radians: number): number {
        return radians * this.RAD2DEG;
    }

    /**
     * Converte graus para radianos
     * @param degrees - Graus
     * @returns - O valor convertido em radianos
     */
    public static degToRad(degrees: number): number {
        return degrees * this.DEG2RAD;
    }
 
    public static toPercent(value: number){
        return value * 100;
    }
    
     /**
     * Garante que o valor esteja dentro de um intervalo
     * @param value - O valor a ser verificado 
     * @param min - O valor mínimo
     * @param max - O valor máximo 
     * @returns - O valor dentro do intervalo
     */
     public static clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max);
    }
    public static rotateAround(position: Vector2, pivot:Vector2, angle: number): Vector2 {

        const sin = Mathf.sin(angle);
        const cos = Mathf.cos(angle);
        const dx = position.x - pivot.x;
        const dy = position.y - pivot.y;

        const rotatedX = dx * cos - dy * sin + pivot.x;
        const rotatedY = dx * sin + dy * cos + pivot.y;

        return new Vector2(rotatedX,  rotatedY);
    }

    public static rotatePoint(point: Vector2, angle: number){
        return new Vector2(
            point.x * Math.cos(angle) - point.y * Math.sin(angle),
            point.x * Math.sin(angle) + point.y * Math.cos(angle)
        );
    }

    public static lerp(a: number, b: number, t: number): number {
        return a + (b - a) * this.clamp01(t);
    }

    public static clamp01(value: number): number {
        return Mathf.clamp(value, 0, 1);
    }

   
    public static distance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    public static dotProduct(ax: number, ay: number, bx: number, by: number): number {
        return ax * bx + ay * by;
    }

    public static distanceToLine(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
        const A = px - ax;
        const B = py - ay;
        const C = bx - ax;
        const D = by - ay;
        const dot = this.dotProduct(A, C, B, D);
        const lenSq = C * C + D * D;
        const param = (lenSq !== 0) ? dot / lenSq : -1;
        let closestX: number, closestY: number;
    
        if (param < 0) {
            closestX = ax;
            closestY = ay;
        } else if (param > 1) {
            closestX = bx;
            closestY = by;
        } else {
            closestX = ax + param * C;
            closestY = ay + param * D;
        }
    
        return this.distance(px, py, closestX, closestY);
    }

    

}