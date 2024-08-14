import ScryptManager from "../Engine/Managers/ScryptManager";
import EditObject from "./EditObject";

export function importer() {
   ScryptManager.addNewScrypt(new EditObject());
}