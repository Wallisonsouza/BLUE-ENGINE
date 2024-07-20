export default class Mathf {

    public static get PI(){
        return Math.PI;
    }
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
    public static oppositeDeg(angle: number) {
        return (angle + 180) % 360;
    }

    public static oppositeRad(angle: number) {
        return (angle + Math.PI) % (2 * Math.PI);
    }

    public static angleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number) {
        return Math.atan2(y2 - y1, x2 - x1);
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
        return radians * (180 / Math.PI);
    }

    /**
     * Converte graus para radianos
     * @param degrees - Graus
     * @returns - O valor convertido em radianos
     */
    public static degToRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
 
    public static toPercent(value: number){
        return value * 100;
    }
 
    public static rotateAround(x: number, y: number, angle: number, pivotX: number, pivotY: number) {

        const rad = Mathf.degToRad(angle);
        const sin = Mathf.sin(rad);
        const cos = Mathf.cos(rad);
        const dx = x - pivotX;
        const dy = y - pivotY;
        return {
            x: dx * cos - dy * sin + pivotX,
            y: dx * sin + dy * cos + pivotY
        };
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