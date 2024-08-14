import Engine from "./Engine/engine";
import "./Style/style.css";


const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const engine = new Engine(canvas);
engine.start();

window.addEventListener("wheel", (event) => {

    if(event.ctrlKey) {
        event.preventDefault();
    }
    
}, {passive: false});

window.addEventListener("gesturestart", function(event) {
    event.preventDefault();
});

window.addEventListener("gesturechange", function(event) {
    event.preventDefault();
});

window.addEventListener("gesture", function(event) {
    event.preventDefault();
});

window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

