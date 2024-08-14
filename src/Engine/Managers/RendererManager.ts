import Collider from "../engine/Collider";
import Renderer from "../engine/base_renderer";
import CollisionData from "../engine/data_collision";
import Camera from "../components/Camera";
import Options from "../components/Optios";
import SceneManager from "./SceneManager";
import Input from "../Input/Input";
import ScryptManager from "./ScryptManager";
import Mathf from "../static/Mathf";
import EngineCache from "./Cache";
import Draw from "../components/Draw";

export default class RendererManager {

    private static currentCamera: Camera = new Camera();
   
    public static update(ctx: CanvasRenderingContext2D, deltaTime: number): void {

        const currentScene = SceneManager.getCurrentScene();
        if (!currentScene) return;
        const entities = currentScene.hierarchy.getGameObjects();

        if(ctx) {
            const sortedEntities = entities.sort((a, b) => a.rect.index - b.rect.index);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            sortedEntities.forEach((entity) => {
                if (!entity.active) return;
                
                const renderers = entity.getComponents(Renderer);
               
                ctx.save();
                
                renderers.forEach((renderer) => {
                    const rotatedPosition = entity.rect.getRotatedPosition();
                    ctx.translate(rotatedPosition.x, rotatedPosition.y);
                    ctx.rotate(Mathf.degToRad(entity.rect.rotation));
                    renderer.render(ctx, this.currentCamera);
                });
                
                ctx.restore();
                
            });
        }
    }
}
