import CollisionData from "./data_collision";

/**
 * Classe base para todos os objetos Mono.
 */
export default class Scrypt {
    
    /** Método chamado no início. */
    public start(): void {}

    /** Método chamado a cada frame. */
    public update(_deltaTime: number): void {}

    /** Método chamado a cada atualização fixa de frame. */
    public fixedUpdate(): void {}

    /**
     * Método chamado quando ocorre uma colisão. */
    public onCollisionEnter(_data: CollisionData) {}

    /**
     * Método chamado quando a colisão persiste.
     * @param {CollisionData} _data - Os dados da colisão.
     */
    public onCollisionStay(_data: CollisionData) {}

    /**
     * Método chamado quando a colisão termina.
     * @param {CollisionData} _data - Os dados da colisão.
     */
    public onCollisionExit(_data: CollisionData) {}

}