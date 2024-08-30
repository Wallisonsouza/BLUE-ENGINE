import ScryptManager from "./Engine/Managers/ScryptManager";
import Engine from "./Engine/engine";
import SimpleEngine from "./SimpleEngine";

ScryptManager.addNewScrypt(new SimpleEngine());

function getCanvas(canvasId: string) {

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if(!canvas){
        throw new Error(`Falha ao buscar um canvas com o id "${canvasId}"`);
    }

    return canvas;
}

async function initialize() {

    const engine = new Engine(getCanvas("canvas"));
  
    await engine.loadResources();
    engine.initialize();

    console.log("Engine inicializado com sucesso.");
}

initialize();



























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
});
