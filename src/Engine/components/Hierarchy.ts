// import Camera from "../components/Camera";
// import GameObject from "../components/GameObject";

// /**
//  * Classe que representa a hierarquia de entidades
//  */
// export default class Hierarchy {
//     private _entities:Map<number,Array<GameObject>>;

//     constructor() {
//         this._entities = new Map<number, GameObject[]>();
//     }

//     public addGameObject(entity: GameObject): void {
//         if (!this._entities.has(entity.layer)) {
//             this._entities.set(entity.layer, []);
//         }
        
//         this._entities.get(entity.layer)?.push(entity);
//     }
//     public deleteGameObject(entity: GameObject): void {
//         if (this._entities.has(entity.layer)) {
//             this._entities.delete(entity.layer);
//         }
//     }

//     public getGameObjects(): GameObject[] {
//         const entities: GameObject[] = [];
//         this._entities.forEach((value) => {
//             value.forEach((entity) => {
//                 entities.push(entity);
//             });
//         });
//         return entities;
//     }
    
//     public createGameObject(): GameObject {
//         const entity = new GameObject();
//         this.addGameObject(entity);
//         return entity;
//     }

//     public getCamera(): Camera | null {
//         let camera: Camera | null = null;
//         this.getGameObjects().forEach((entity) => {
//             if (entity.hasComponent(Camera)) {
//                 camera = entity.getComponent(Camera);
//             }
//         });
//         return camera;
      
//     }
// }

import GameObject from "./GameObject";

/**
 * Classe que representa a hierarquia de entidades
 */
export default class Hierarchy {
    private _gameObjects: GameObject[];

    constructor() {
        this._gameObjects = [];
    }

    public addGameObject(entity: GameObject): void {
        this._gameObjects.push(entity);
    }

    public deleteGameObject(entity: GameObject): void {
        const index = this._gameObjects.indexOf(entity);
        if (index > -1) {
            this._gameObjects.splice(index, 1);
        }
    }

    public getGameObjects(): GameObject[] {
        return this._gameObjects;
    }
    
    public createGameObject(): GameObject {
        const entity = new GameObject();
        this.addGameObject(entity);
        return entity;
    }
}
