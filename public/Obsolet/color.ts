// import Mathf from "./Mathf";

// class RGB {

//     public r: number = 0;
//     public g: number = 0;
//     public b: number = 0;

//     constructor(r: number, g: number, b: number) {

//         this.r = Mathf.clamp(r, 0, 255);
//         this.g = Mathf.clamp(g, 0, 255);
//         this.b = Mathf.clamp(b, 0, 255);
//     }

//     public toString(): string {
//         return `rgb(${this.r}, ${this.g}, ${this.b})`;
//     }
   
//     public toHSL(): HSL {
//         const r = this.r / 255;
//         const g = this.g / 255;
//         const b = this.b / 255;

//         const max = Math.max(r, g, b);
//         const min = Math.min(r, g, b);

//         let h = 0;
//         let s = 0;
//         const l = (max + min) / 2;

//         if (max === min) {
//             h = s = 0;
//         } else {
//             const d = max - min;
//             s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//             switch (max) {
//                 case r:
//                     h = (g - b) / d + (g < b ? 6 : 0);
//                     break;
//                 case g:
//                     h = (b - r) / d + 2;
//                     break;
//                 case b:
//                     h = (r - g) / d + 4;
//                     break;
//             }

//             h /= 6;
//         }

//         return new HSL(h * 360, s * 100, l * 100);
       
//     }
    

//     public toHEX(): HEX {
//         const hex = "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
//         return new HEX(hex);
//     }
// }


// class RGBA {

//     public r: number = 0;
//     public g: number = 0;
//     public b: number = 0;
//     public a: number = 0;

//     constructor(r: number, g: number, b: number, a: number) {
//         this.r = Mathf.clamp(r, 0, 255);
//         this.g = Mathf.clamp(g, 0, 255);
//         this.b = Mathf.clamp(b, 0, 255);
//         this.a = Mathf.clamp(a, 0, 1);
//     }

//     public toString(): string {
//         return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
//     }

//     public toHSL(): HSL {
//         const r = this.r / 255;
//         const g = this.g / 255;
//         const b = this.b / 255;

//         const max = Math.max(r, g, b);
//         const min = Math.min(r, g, b);

//         let h = 0;
//         let s = 0;
//         const l = (max + min) / 2;

//         if (max === min) {
//             h = s = 0;
//         } else {
//             const d = max - min;
//             s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//             switch (max) {
//                 case r:
//                     h = (g - b) / d + (g < b ? 6 : 0);
//                     break;
//                 case g:
//                     h = (b - r) / d + 2;
//                     break;
//                 case b:
//                     h = (r - g) / d + 4;
//                     break;
//             }

//             h /= 6;
//         }

//         return new HSL(h * 360, s * 100, l * 100);
//     }

//     public toHEX(): HEX {
//         const hex = "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
//         return new HEX(hex);
//     }


   
// }

// class HSL {
//     public h: number = 0;
//     public s: number = 0;
//     public l: number = 0;

//     constructor(h: number, s: number, l: number) {
//         this.h = h;
//         this.s = s;
//         this.l = l;
//     }

//     public toString(): string {
//         return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
//     }
// }

// class HEX {
//     public hex: string = "#000000";

//     constructor(hex: string) {
//         this.hex = hex;
//     }

//     public toString(): string {
//         return this.hex;
//     }
// }

// /**
//  * @description A classe Color é responsável por armazenar cores e converter entre diferentes formatos de cores
//  */
// export default class Color {

//     public static white: RGB = new RGB(255, 255, 255);
//     public static black: RGB = new RGB(0, 0, 0);
//     public static red: RGB = new RGB(255, 0, 0);
//     public static green: RGB = new RGB(0, 255, 0);
//     public static blue: RGB = new RGB(0, 0, 255);
//     public static yellow: RGB = new RGB(255, 255, 0);
//     public static cyan: RGB = new RGB(0, 255, 255);
//     public static magenta: RGB = new RGB(255, 0, 255);
//     public static gray: RGB = new RGB(128, 128, 128);
//     public static darkGray: RGB = new RGB(64, 64, 64);
//     public static lightGray: RGB = new RGB(192, 192, 192);
//     public static orange: RGB = new RGB(255, 200, 0);
//     public static pink: RGB = new RGB(255, 175, 175);
//     public static purple: RGB = new RGB(128, 0, 128);
//     public static brown: RGB = new RGB(139, 69, 19);
//     public static olive: RGB = new RGB(128, 128, 0);
//     public static teal: RGB = new RGB(0, 128, 128);
//     public static navy: RGB = new RGB(0, 0, 128);
//     public static maroon: RGB = new RGB(128, 0, 0);
//     public static lime: RGB = new RGB(0, 255, 0);
//     public static indigo: RGB = new RGB(75, 0, 130);
//     public static gold: RGB = new RGB(255, 215, 0);
//     public static silver: RGB = new RGB(192, 192, 192);
//     public static bronze: RGB = new RGB(205, 127, 50);
//     public static aqua: RGB = new RGB(0, 255, 255);
//     public static turquoise: RGB = new RGB(64, 224, 208);
//     public static violet: RGB = new RGB(238, 130, 238);
//     public static beige: RGB = new RGB(245, 245, 220);
//     public static ivory: RGB = new RGB(255, 255, 240);
//     public static khaki: RGB = new RGB(240, 230, 140);
//     public static lavender: RGB = new RGB(230, 230, 250);
//     public static peach: RGB = new RGB(255, 218, 185);
//     public static plum: RGB = new RGB(221, 160, 221);
//     public static salmon: RGB = new RGB(250, 128, 114);
//     public static tan: RGB = new RGB(210, 180, 140);
//     public static tomato: RGB = new RGB(255, 99, 71);
//     public static wheat: RGB = new RGB(245, 222, 179);
//     public static azure: RGB = new RGB(240, 255, 255);
//     public static bisque: RGB = new RGB(255, 228, 196);
//     public static coral: RGB = new RGB(255, 127, 80);
//     public static cornflower: RGB = new RGB(100, 149, 237);
//     public static crimson: RGB = new RGB(220, 20, 60);

//     public static RGB(r: number, g: number, b: number): RGB {
//         return new RGB(r, g, b);
//     }

//     public static rgba(r: number, g: number, b: number, a: number): RGBA {
//         return new RGBA(r, g, b, a);
//     }

//     public static hsl(h: number, s: number, l: number): HSL {
//         return new HSL(h, s, l);
//     }

//     public static hex(hex: string): HEX {
//         return new HEX(hex);
//     }
   
//     /**
//      * @description Convert RGB to HEX
//      * @param rgb 
//      * @returns HEX
//      */
//     public static rgbToHex(rgb: RGB): HEX {
//         const hex = "#" + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
//         return new HEX(hex);
//     }

//     /**
//      * @description Convert HEX to RGB
//      * @param hex 
//      * @returns RGB
//      */
//     public static hexToRgb(hex: HEX): RGB {
//         const r = parseInt(hex.hex.substring(1, 3), 16);
//         const g = parseInt(hex.hex.substring(3, 5), 16);
//         const b = parseInt(hex.hex.substring(5, 7), 16);
//         return new RGB(r, g, b);
//     }

//     /**
//      * @description Convert RGB to HSL
//      * @param rgb 
//      * @returns HSL
//      */
//     public static rgbToHsl(rgb: RGB): HSL {
//         const r = rgb.r / 255;
//         const g = rgb.g / 255;
//         const b = rgb.b / 255;

//         const max = Math.max(r, g, b);
//         const min = Math.min(r, g, b);

//         let h = 0;
//         let s = 0;
//         const l = (max + min) / 2;

//         if (max === min) {
//             h = s = 0;
//         } else {
//             const d = max - min;
//             s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

//             switch (max) {
//                 case r:
//                     h = (g - b) / d + (g < b ? 6 : 0);
//                     break;
//                 case g:
//                     h = (b - r) / d + 2;
//                     break;
//                 case b:
//                     h = (r - g) / d + 4;
//                     break;
//             }

//             h /= 6;
//         }

//         return new HSL(h * 360, s * 100, l * 100);
//     }

//     public static rgb(r: number, g: number, b: number){
//         return `rgb(${r}, ${g}, ${b})`;
//     }

   
// }

