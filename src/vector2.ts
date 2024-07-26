import Mathf from "./Engine/static/Mathf";

export  default class Vector2 {

    public static readonly zero = new Vector2(0, 0);
    public static readonly one = new Vector2(1, 1);
    public static readonly right = new Vector2(1, 0);
    public static readonly left = new Vector2(-1, 0);
    public static readonly top = new Vector2(0, -1);
    public static readonly bottom = new Vector2(0, 1);
    public static readonly center = new Vector2(0.5, 0.5);
    public static readonly up = new Vector2(0, -1);
    public static readonly down = new Vector2(0, 1);


    public x: number;
    public y: number;


    constructor(vector: Vector2);
    constructor(x: number, y: number);
    constructor(xOrVector: number | Vector2, y?: number) {
        if (xOrVector instanceof Vector2) {
            // Construtor com um argumento do tipo Vector2
            this.x = xOrVector.x;
            this.y = xOrVector.y;
        } else {
            // Construtor com dois argumentos: x e y
            this.x = xOrVector;
            this.y = y!;
        }
    }


    public static subtract(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    public static multiply(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    public static divide(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x / v2.x, v1.y / v2.y);
    }

    public static rotate(v: Vector2, angle: number): Vector2 {
        let rad = Mathf.degToRad(angle);
        return new Vector2(
            v.x * Math.cos(rad) - v.y * Math.sin(rad),
            v.x * Math.sin(rad) + v.y * Math.cos(rad)
        );
    }



































    /**
     *  Soma dois vetores e atribui o resultado ao vetor atual.
     * @param vector Vetor a ser incrementado.
     */
    public increment(vector: Vector2) {
        this.x += vector.x;
        this.y += vector.y;
       
    }

    public decrement(vector: Vector2) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    public add(vector: Vector2) {
        return new Vector2(this.x + vector.x, this.y + vector.y);
       
    }

    /**
     * Subtrai dois vetores e retorna um novo vetor.
     * @param vector Vetor a ser subtraído.
     * @returns Vetor resultante da subtração.
     */
    public subtract(vector: Vector2) {
        return new Vector2(this.x - vector.x, this.y - vector.y);
    }

    /**
     * Multiplica um vetor por um escalar e retorna um novo vetor.
     * @param scalar Escalar a ser multiplicado.
     * @returns Vetor resultante da multiplicação.
     */
    public multiplyScalar(scalar: number) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    /**
     * Divide um vetor por um escalar e retorna um novo vetor.
     * @param scalar Escalar a ser dividido.
     * @returns Vetor resultante da divisão.
     */
    public divideScalar(scalar: number) {
        return new Vector2(this.x / scalar, this.y / scalar);
    }

    /**
     * 
     * @returns Retorna a magnitude do vetor.
     */
    public magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * 
     * @returns Retorna o vetor normalizado.
     */
    public normalize() {
        const magnitude = this.magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    /**
     * 
     * @param vector Vetor a ser comparado.
     * @returns Retorna a distância entre os dois vetores.
     */
    public dot(vector: Vector2) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * 
     * @param vector Vetor a ser comparado.
     * @returns Retorna o ângulo entre os dois vetores.
     */
    public angle(vector: Vector2) {
        return Math.acos(this.dot(vector) / (this.magnitude() * vector.magnitude()));
    }

    /**
     * 
     * @param vector Vetor a ser comparado.
     * @returns Retorna a distância entre os dois vetores.
     */
    public distance(vector: Vector2) {
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    }

    public static fromAngle(angle: number) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }

    public static multilply(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    public negate() {
        return new Vector2(-this.x, -this.y);
    }

    public multiply(v: Vector2) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }

    public cross(v: Vector2) {
        return this.x * v.y - this.y * v.x;
    }

    public normal() {
        return new Vector2(-this.y, this.x);
    }

    public rotate(angle: number): Vector2 {
        let rad = angle * Math.PI / 180; 
        return new Vector2(
            this.x * Math.cos(rad) - this.y * Math.sin(rad),
            this.x * Math.sin(rad) + this.y * Math.cos(rad)
        );
    }
 
    public static rotatePoint(point: Vector2, angle: number): Vector2 {
        let rad = angle * Math.PI / 180; 
        return new Vector2(
            point.x * Math.cos(rad) - point.y * Math.sin(rad),
            point.x * Math.sin(rad) + point.y * Math.cos(rad)
        );
    }
    public static rotatePointOrigin(point: Vector2, angle: number, origin: Vector2): Vector2 {
        // Translada o ponto para que o ponto de origem se torne a nova origem (0,0)
        let translatedPoint = new Vector2(point.x - origin.x, point.y - origin.y);

        // Aplica a rotação
        let rotatedX = translatedPoint.x * Math.cos(angle) - translatedPoint.y * Math.sin(angle);
        let rotatedY = translatedPoint.x * Math.sin(angle) + translatedPoint.y * Math.cos(angle);

        // Translada o ponto de volta para sua posição original
        let finalX = rotatedX + origin.x;
        let finalY = rotatedY + origin.y;

        return new Vector2(finalX, finalY);
    }
    
    public static normalize(v: Vector2) {
        const magnitude = v.magnitude();
        return new Vector2(v.x / magnitude, v.y / magnitude);
    }

    public static distance(v1: Vector2, v2: Vector2) {
        return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
    }
    public static add(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    public perp(): Vector2 {
        return new Vector2(-this.y, this.x);
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
    

    public divide(v: Vector2) {
        return new Vector2(this.x / v.x, this.y / v.y);
    }
   
}