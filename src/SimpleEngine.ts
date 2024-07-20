import Scene from "./testes/Scene";
import EditorWindow from "./testes/base/editor_window";
import Engine from "./testes/engine";
import WindowManager from "./testes/Managers/WindowManager";
import SceneManager from "./testes/Managers/SceneManager";
import CreateObject from "./testes/Object/CreateObject";

export default class SimpleEngine extends  Engine {
  constructor() {
    super();
  
    // cria a janela do editor onde sera renderizado o jogo
    const editor = new EditorWindow();
    WindowManager.addWindow(editor);

    // cria a cena e adiciona ao gerenciador de cenas
    const scene1 = new Scene("scene1");
    SceneManager.addScene(scene1);

    //cria a camera e adiciona a cena
    CreateObject.camera();

  
    // // cria um triangulo e adiciona a cena
    // const triangle = CreateObject.triangle();

    this.start();
  }
}
