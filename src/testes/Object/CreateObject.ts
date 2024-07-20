import SceneManager from "../Managers/SceneManager";
import Camera from "../extension/Camera";
import MouseCollider from "../extension/ColliderMouse";
import GameObject from "../extension/GameObject";
import MouseBorderCollider from "../extension/mouseBorderCollider";
import SquareRenderer from "../renderer/SquareRenderer";

export default class CreateObject {

    public static camera(): GameObject {

        const scene = SceneManager.getCurrentScene();
        const object = new GameObject();
        object.name = "Camera";
        const camera = object.addComponent(Camera);
        camera.gameObject = object;
        scene?.hierarchy.addGameObject(object);
        return object;
    }


    public static square(color: string = "white"): GameObject {
        
        const scene = SceneManager.getCurrentScene();
        const object = new GameObject();
        object.name = "Square";

        const squareRenderer = object.addComponent(SquareRenderer);
        squareRenderer.fillColor = color;
  
        scene?.hierarchy.addGameObject(object);
        object.addComponent(MouseCollider);
        object.addComponent(MouseBorderCollider);
        return object;
    }
  
}