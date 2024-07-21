import { ScryptManager } from "./experimental/ScryptManager";
import { importer } from "./Figma/importer";
import SimpleEngine from "./SimpleEngine";

let engine = new SimpleEngine();

engine.start();


importer();

ScryptManager.logics.forEach((logic) => {
    logic.start();
});
