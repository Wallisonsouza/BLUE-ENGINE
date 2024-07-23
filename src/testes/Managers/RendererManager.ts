import { ScryptManager } from "../ScryptManager";
import Collider from "../engine/Collider";
import Renderer from "../engine/base_renderer";
import CollisionData from "../engine/data_collision";
import Camera from "../components/Camera";
import Options from "../components/Optios";
import Input from "../static/input";
import SceneManager from "./SceneManager";
import WindowManager from "./WindowManager";

export default class RendererManager {

    private static currentCamera: Camera = new Camera();
    private static previousCollisionStates: Map<string, boolean> = new Map();
    private static collisionCache: Map<string, CollisionData> = new Map();

    public static render(): void {
        const windows = WindowManager.getRenderableWindows();
        if (windows.length === 0) return;
        WindowManager.clearWindows();

        const currentScene = SceneManager.getCurrentScene();
        if (!currentScene) return;

        const entities = currentScene.hierarchy.getGameObjects();

        // Ordenar entidades com base no zIndex
        // const sortedEntities = entities.sort((a, b) => a.transform.zIndex - b.transform.zIndex);

        // Limpar cache de colisão
        this.collisionCache.clear();

        entities.forEach((entity) => {
            if (!entity.active) return;

            // Cache de componentes para reduzir buscas repetidas
            const renderers = entity.getComponents(Renderer);
            const colliders = entity.getComponents(Collider);

            renderers.forEach((renderer) => {
                renderer.render(windows[0], this.currentCamera);
            });

            colliders.forEach((collider) => {

                if (!collider.actived) return;

                // Renderização condicional dos colliders
                if (Options.debug) {
                    collider.drawnCollider(windows[0], this.currentCamera, entity.transform);
                }

                const mousePosition = Input.getMousePosition();
                const isColliding = collider.checkCollision(entity.transform, mousePosition.x, mousePosition.y);
                const previousState = this.previousCollisionStates.get(collider.id) || false;

                if (isColliding) {
                    const collisionData = new CollisionData(entity, collider);
                    this.collisionCache.set(collider.id, collisionData);

                    if (!previousState) {
                        // Mouse entrou
                        if (Options.debug) {
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
                    if (Options.debug) {
                        collider.strokeColor = "transparent";
                    }
                    const collisionData = new CollisionData(entity, collider);
                    ScryptManager.logics.forEach((logic) => {
                        logic.onCollisionExit(collisionData);
                    });
                }

                // Atualizar o estado anterior
                this.previousCollisionStates.set(collider.id, isColliding);
            });
        });

        // Processar o cache de colisões para garantir que apenas o colisor mais relevante seja acionado
        this.processCollisionCache();
    }

    private static processCollisionCache(): void {
        this.collisionCache.forEach((collisionData) => {
            const collider = collisionData.collider;
            const previousState = this.previousCollisionStates.get(collider.id) || false;
            const isColliding = collider.checkCollision(collisionData.gameObject.transform, Input.getMousePosition().x, Input.getMousePosition().y);

            if (isColliding) {
                if (!previousState) {
                    ScryptManager.logics.forEach((logic) => {
                        logic.onCollisionEnter(collisionData);
                    });
                } else {
                    ScryptManager.logics.forEach((logic) => {
                        logic.onCollisionStay(collisionData);
                    });
                }
            } else if (previousState) {
                ScryptManager.logics.forEach((logic) => {
                    logic.onCollisionExit(collisionData);
                });
            }
        });
    }
}
