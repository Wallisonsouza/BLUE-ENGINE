import ScryptManager from "./Engine/Managers/ScryptManager";
import Engine from "./Engine/engine";
import Events from "./Events";
import SimpleEngine from "./SimpleEngine";

function getCanvas(canvasId: string) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if(!canvas){
        throw new Error(`Falha ao buscar um canvas com o id "${canvasId}"`);
    }

    return canvas;
}

async function initialize() {
    const canvas = getCanvas("canvas");
    Events.addBlockResizeEvents();
    Events.addCanvasResize(canvas);
    
    const engine = new Engine(canvas);
    ScryptManager.addNewScrypt(new SimpleEngine());
    await engine.loadResources();
    engine.initialize();

    console.log("Engine inicializado com sucesso.");
}

initialize();

