import RendererManager from "./Engine/Managers/RendererManager";
import SimpleEngine from "./SimpleEngine";
import "./Style/style.css";


const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
function resizeCanvas(){
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
}
resizeCanvas();

window.addEventListener("resize", (e) => {
   resizeCanvas();
});


let engine = new SimpleEngine(ctx);
engine.start();


const inspectorHandle = document.getElementById("inspector-handle") as HTMLDivElement;
const inspector = document.getElementById("inspector") as HTMLDivElement;

let isResizing = false;
let originalWidth = 0;

inspectorHandle.addEventListener("mousedown", (e) => {

    if(e.button !== 0) return;
    isResizing = true;

    const rect = inspector.getBoundingClientRect();
    originalWidth = rect.width;
    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    if(isResizing) {
        originalWidth -= e.movementX;
        inspector.style.width = `${originalWidth}px`;
        resizeCanvas();
    }
});

document.addEventListener("mouseup", (e) => {
    isResizing = false;
});

