export default class Color {

    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a: number
    ) {}

    public static get white(): Color {
        return new Color(1, 1, 1, 1);
    }

    public static get black(): Color {
        return new Color(0.0, 0.0, 0.0, 1.0);
    }

    public static get red(): Color {
        return new Color(1.0, 0.0, 0.0, 1.0);
    }
  
    public static get green(): Color {
        return new Color(0.0, 1.0, 0.0, 1.0);
    }

    public static get blue(): Color {
        return new Color(0.0, 0.0, 1.0, 1.0);
    }

    public toString(): string {
        return `rgba(${this.r * 255}, ${this.g * 255}, ${this.b * 255}, ${this.a})`;
    }
    public toVec4(): [number, number, number, number] {
        return [this.r, this.g, this.b, this.a];
    }
}
