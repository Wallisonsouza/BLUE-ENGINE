import ScryptManager from "./Engine/Managers/ScryptManager";
import Engine from "./Engine/engine";
import Events from "./Events";
import SimpleEngine from "./SimpleEngine";

Events.addBlockResizeEvents();

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