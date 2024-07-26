// export default class BaseWindow {
//     public canvas: HTMLCanvasElement;
//     public context: CanvasRenderingContext2D;

//     constructor() {

//         this.canvas = document.createElement('canvas');
//         this.canvas.className = 'game-canvas';

//         const ctx = this.canvas.getContext('2d');
//         if (!this.canvas || !ctx) {
//             throw new Error('Canvas not found');
//         }
//         this.context = ctx;
        
//         this.canvas.width = window.innerWidth;
//         this.canvas.height = window.innerHeight;
        
//         window.addEventListener("resize", () => {

//             this.canvas.width = window.innerWidth;
//             this.canvas.height = window.innerHeight;
//         });
//     }

// }