import Hierarchy from "./static/hierarchy";

export default class Scene {    

    public name: string;
    public hierarchy: Hierarchy = new Hierarchy(); 
   

    constructor(name: string = "New scene") {
        this.name = name;
    }
}