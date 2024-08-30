// import SceneManager from "../Managers/SceneManager";
// import Camera from "../components/Camera";
// import GameObject from "../components/GameObject";
// import ImageRenderer from "../renderer/ImageRenderer";
// import SquareRenderer from "../renderer/SquareRenderer";

// export default class CreateObject {

//     public static camera(): GameObject {
//         const scene = SceneManager.getCurrentScene();
//         const object = new GameObject();
//         object.name = "Camera";
//         const camera = object.addComponent(Camera);
//         camera.gameObject = object;
//         scene?.hierarchy.addGameObject(object);
//         return object;
//     }

//     public static square(color: string = "white"): GameObject {
//         const scene = SceneManager.getCurrentScene();
//         const object = new GameObject();
//         object.name = "New Square";
//         const squareRenderer =  object.addComponent(SquareRenderer);
//        squareRenderer.fillColor = color;
//         scene?.hierarchy.addGameObject(object);
//         return object;
//     }

//     public static image(src: string = "src/Assets/Images/no-image.svg"){
//         const scene = SceneManager.getCurrentScene();
//         const object = new GameObject();
//         object.name = "New Image";
//         const imageRenderer = object.addComponent(ImageRenderer);
//         imageRenderer.setImageSource(src);
//         scene?.hierarchy.addGameObject(object);
//         return object;
//     }
  
// }