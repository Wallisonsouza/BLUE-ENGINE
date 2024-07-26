import Collider from "../engine/Collider";
import Renderer from "../engine/base_renderer";
import CollisionData from "../engine/data_collision";
import Camera from "../components/Camera";
import Options from "../components/Optios";
import SceneManager from "./SceneManager";
import Input from "../Input/Input";
import ScryptManager from "./ScryptManager";

export default class RendererManager {

    private static currentCamera: Camera = new Camera();
    private static previousCollisionStates: Map<string, boolean> = new Map();
    private static ctx: CanvasRenderingContext2D;
    public static setContext(ctx: CanvasRenderingContext2D): void {
        this.ctx = ctx;
    }

    public static render(): void {

        if(this.ctx) {

            const currentScene = SceneManager.getCurrentScene();
            if (!currentScene) return;
            const entities = currentScene.hierarchy.getGameObjects();
    
    
            entities.forEach((entity) => {
                if (!entity.active) return;
                
                const renderers = entity.getComponents(Renderer);
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                renderers.forEach((renderer) => {
                    renderer.render(this.ctx, this.currentCamera);
                });

                
    
                const mousePosition = Input.mousePosition;
                const previousState = this.previousCollisionStates.get(entity.id) || false;
                const mouseCollision = entity.rect.contains(mousePosition.x, mousePosition.y, this.currentCamera);
    
                if(mouseCollision){
                    if(!previousState){
                        ScryptManager.scrypts.forEach((scrypt) => {
                            scrypt.onMouseEnter(entity);
                        });
                    } else {
                        ScryptManager.scrypts.forEach((scrypt) => {
                            scrypt.onMouseStay(entity);
                        });
                    }
                } else if(previousState){
                    ScryptManager.scrypts.forEach((scrypt) => {
                        scrypt.onMouseExit(entity);
                    });
                }
    
                // Atualizar o estado anterior da colisão do mouse
                this.previousCollisionStates.set(entity.id, mouseCollision);
            });
        }
 
       
       
    }
}


            // Ordenar entidades com base no zIndex
//             // const sortedEntities = entities.sort((a, b) => a.transform.zIndex - b.transform.zIndex);
// WindowManager.clearWindows();