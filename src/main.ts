import RendererManager from "./Engine/Managers/RendererManager";
import { importer } from "./Figma/importer";
import SimpleEngine from "./SimpleEngine";
import "./Style/style.css";


const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", (e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


let engine = new SimpleEngine();
RendererManager.setContext(ctx);
importer();
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
    }
});

document.addEventListener("mouseup", (e) => {
    isResizing = false;
});

