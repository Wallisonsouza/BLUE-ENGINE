import Engine from "./Engine/engine";
import SceneManager from "./Engine/Managers/SceneManager";
import Scene from "./Engine/Scene";


export default class SimpleEngine extends  Engine {
  constructor() {
    super();

    // cria a cena e adiciona ao gerenciador de cenas
    const scene1 = new Scene("scene1");
    SceneManager.addScene(scene1);
    this.start();
  }
}
