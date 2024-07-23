import { importer } from "./Figma/importer";
import SimpleEngine from "./SimpleEngine";

let engine = new SimpleEngine();
importer();
engine.start();