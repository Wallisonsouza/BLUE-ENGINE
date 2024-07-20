import { ScryptManager } from "../../experimental/ScryptManager";
import Collider from "../base/Collider";
import Renderer from "../base/base_renderer";
import CollisionData from "../base/data_collision";
import Camera from "../extension/Camera";
import Options from "../extension/Optios";
import Input from "../static/input";
import SceneManager from "./SceneManager";
import WindowManager from "./WindowManager";

export default class RendererManager {

    private static currentCamera: Camera;
    private static previousCollisionStates: Map<string, boolean> = new Map();

    public static render(): void {
        const windows = WindowManager.getRenderableWindows();
        if (windows.length === 0) return;
        WindowManager.clearWindows();
    
        const currentScene = SceneManager.getCurrentScene();
        if (!currentScene) return;
    
        if (!this.currentCamera) {

            this.currentCamera = currentScene.hierarchy.getCamera();
        }

        const entities = currentScene.hierarchy.getGameObjects();

        // Supondo que previousCollisionStates já esteja definido e atualizado em outro lugar de forma eficiente

        windows.forEach((window) => {

            const sortedEntities = entities.sort((a, b) => a.transform.zIndex - b.transform.zIndex);
            sortedEntities.forEach((entity) => {

                if(!entity.active) return;

                // Cache de componentes para reduzir buscas repetidas
                const renderers = entity.getComponents(Renderer);
                const colliders = entity.getComponents(Collider);
        
                renderers.forEach((renderer) => {
                    renderer.render(window, this.currentCamera);
                });

                colliders.forEach((collider) => {

                    if(!collider.actived) return;

                    // Renderização condicional dos colliders
                    if (Options.debug) {
                        collider.drawnCollider(windows[0], this.currentCamera, entity.transform);
                    }

                    const isColliding = collider.checkCollision(entity.transform, Input.mousePosition.x, Input.mousePosition.y);
                    const previousState = this.previousCollisionStates.get(collider.id) || false;
            
                    if (isColliding) {
                        const collisionData = new CollisionData(entity, collider); // Considerar reutilizar para reduzir alocação
                        if (!previousState) {
                            // Mouse entrou
                            if(Options.debug){
                                collider.strokeColor = "green";
                            }
                            ScryptManager.logics.forEach((logic) => {
                                logic.onCollisionEnter(collisionData);
                            });
                        } else {
                            // Colisão permanece
                            ScryptManager.logics.forEach((logic) => {
                                logic.onCollisionStay(collisionData);
                            });
                        }
                    } else if (previousState) {
                        // Mouse saiu
                        if(Options.debug){
                            collider.strokeColor = "transparent";
                        }
                        const collisionData = new CollisionData(entity, collider); // Considerar reutilizar para reduzir alocação
                        ScryptManager.logics.forEach((logic) => {
                            logic.onCollisionExit(collisionData);
                        });
                    }
                    // Atualizar o estado anterior
                    this.previousCollisionStates.set(collider.id, isColliding);
                });
            });
        });
       
    }
}

