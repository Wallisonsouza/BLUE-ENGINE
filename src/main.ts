import RendererManager from "./Engine/Managers/RendererManager";
import { importer } from "./Figma/importer";
import { VisualRect } from "./Figma/VisualRect";
import SimpleEngine from "./SimpleEngine";
VisualRect.setupListeners();

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

