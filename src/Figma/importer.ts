import EditObject from "./EditObject";
import { ScryptManager } from "../experimental/ScryptManager";

export function importer() {
   ScryptManager.addNewScrypt(new EditObject());
 
}