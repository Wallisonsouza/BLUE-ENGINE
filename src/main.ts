import Animation2D, { Animation2DData } from "../SpriteEditor/Animation";
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


const animationData: Animation2DData[] = [
    { x: 0, y: 0, width: 39, height: 53, uvX: 0.1, uvY: 0.1 },
    { x: 39, y: 0, width: 39, height: 53, uvX: 0.2, uvY: 0.2 },
    { x: 78, y: 0, width: 39, height: 53, uvX: 0.3, uvY: 0.3 },
];

const buffer = Animation2D.generateBinaryFile(animationData);

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.animation';

fileInput.onchange = (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      
        if (file.name.endsWith('.animation')) {
            console.log(Animation2D.readBinaryFile(file));
        } else {
            alert('Por favor, selecione um arquivo com a extensão .animation');
        }
    }
};

document.body.appendChild(fileInput);
