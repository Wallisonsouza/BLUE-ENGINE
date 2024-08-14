import Input from "../Input/Input";
import Physics from "../static/Physics";
import SceneManager from "./SceneManager";
import ScryptManager from "./ScryptManager";

export default class PhysicsManager {
    private static previousCollisionStates: Map<string, boolean> = new Map();

    public static fixedUpdate(): void {

        const currentScene = SceneManager.getCurrentScene();
        if (!currentScene) return;
        const mousePosition = Input.getMousePosition();
      
        const entities = currentScene.hierarchy.getGameObjects();
        const scrypts = ScryptManager.getScrypts();

        entities.forEach((entity) => {
            if(entity.rect.physics) {
                const previousState = this.previousCollisionStates.get(entity.id) || false;
                const isColliding = Physics.pointCollision(mousePosition, entity.rect);
    
                if (isColliding && !previousState) {
                    scrypts.forEach((scrypt) => scrypt.onMouseEnter(entity));
                } else if (isColliding) {
                    scrypts.forEach((scrypt) => scrypt.onMouseStay(entity));
                } else if (previousState) {
                    scrypts.forEach((scrypt) => scrypt.onMouseExit(entity));
                }
                this.previousCollisionStates.set(entity.id, isColliding);
            }
        });
    }
}
