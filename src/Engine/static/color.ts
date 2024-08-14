export default class Color {
    // Cor branca
    public static readonly white = new Color(1.0, 1.0, 1.0, 1.0);

    // Cor preta
    public static readonly black = new Color(0.0, 0.0, 0.0, 1.0);

    // Cor vermelha
    public static readonly red = new Color(1.0, 0.0, 0.0, 1.0);

    // Cor verde
    public static readonly green = new Color(0.0, 1.0, 0.0, 1.0);

    // Cor azul
    public static readonly blue = new Color(0.0, 0.0, 1.0, 1.0);

    // Atributos de cor
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    // Construtor
    constructor(r: number, g: number, b: number, a: number = 1.0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    // Método para converter a cor para formato de string (RGBA)
    public toString(): string {
        return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${this.a})`;
    }

    // Método para obter a cor no formato vec4
    public toVec4(): [number, number, number, number] {
        return [this.r, this.g, this.b, this.a];
    }
}
