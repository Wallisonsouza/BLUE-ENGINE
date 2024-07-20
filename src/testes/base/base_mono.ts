import CollisionData from "./data_collision";
import TriggerData from "./data_trigger";

/**
 * Classe base para todos os objetos Mono.
 */
export default class Scrypt {
    
    /** Método chamado no início. */
    public start(): void {}

    /** Método chamado a cada frame. */
    public update(): void {}

    /** Método chamado a cada atualização fixa de frame. */
    public fixedUpdate(): void {}

    /** Método chamado quando o objeto é destruído. */
    public destroy(): void {}

    /** Método chamado quando os Gizmos são desenhados. */
    public onDrawnGizmos() {}

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

    /**
     * Método chamado quando um Trigger é ativado.
     * @param {TriggerData} _data - Os dados do Trigger.
     */
    public onTriggerEnter(_data: TriggerData) {}

    /**
     * Método chamado quando um Trigger persiste.
     * @param {TriggerData} _data - Os dados do Trigger.
     */
    public onTriggerStay(_data: TriggerData) {}

    /**
     * Método chamado quando um Trigger é desativado.
     * @param {TriggerData} _data - Os dados do Trigger.
     */
    public onTriggerExit(_data: TriggerData) {}

}