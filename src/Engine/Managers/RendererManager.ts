// import Collider from "../engine/Collider";
// import Renderer from "../engine/base_renderer";
// import CollisionData from "../engine/data_collision";
// import Camera from "../components/Camera";
// import Options from "../static/Optios";
// import SceneManager from "./SceneManager";
// import Input from "../Input/Input";
// import ScryptManager from "./ScryptManager";
// import Mathf from "../Core/Math/Mathf";
// import EngineCache from "../Cache/EngineCache";
// import Draw from "../components/Draw";

// export default class RendererManager {

//     private static currentCamera: Camera = new Camera();
   
//     public static update(ctx: CanvasRenderingContext2D): void {

//         const currentScene = SceneManager.getCurrentScene();
//         if (!currentScene) return;
//         const entities = currentScene.hierarchy.getGameObjects();

//         if(ctx) {
          
//             ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
//             entities.forEach((entity) => {
//                 if (!entity.active) return;
                
//                 const renderers = entity.getComponents(Renderer);
               
//                 ctx.save();
                
//                 renderers.forEach((renderer) => {
//                     const rotatedPosition = entity.rect.getRotatedPosition();
//                     ctx.translate(rotatedPosition.x, rotatedPosition.y);
//                     ctx.rotate(Mathf.degToRad(entity.rect.rotation));
//                     renderer.render(ctx);
//                 });
                
//                 ctx.restore();
                
//             });
//         }
//     }
// }
