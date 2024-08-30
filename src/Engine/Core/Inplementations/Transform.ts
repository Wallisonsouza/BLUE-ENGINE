import Mat4 from "../Math/Mat4";
import Quat from "../Math/quat";
import Vec3 from "../Math/vec3";
import { ITransform } from "../interfaces/ITransform";
/**
 * Representa a transformação de um objeto no espaço 3D, incluindo sua posição, rotação e escala.
 * Esta classe implementa a interface `ITransform` e fornece métodos para calcular direções baseadas na rotação do objeto.
 */
export default class Transform implements ITransform {
    position: Vec3 = Vec3.zero;
    rotation: Quat = Quat.identity;
    scale: Vec3 = Vec3.one;

    constructor(postion: Vec3 = Vec3.zero){
        this.position = postion;
    }
    getRightDirection(): Vec3 {
        return Quat.multiplyVec3(this.rotation, new Vec3(1, 0, 0));
    }

    getLeftDirection(): Vec3 {
        return Quat.multiplyVec3(this.rotation, new Vec3(-1, 0, 0));
    }
    getBackwardDirection(): Vec3 {
        return Quat.multiplyVec3(this.rotation, new Vec3(0, 0, -1));
    }
   
    getForwardDirection(): Vec3 {
        return Quat.rotateVector(this.rotation, Vec3.forward);
    }
    getUpDirection(): Vec3 {
        return Quat.multiplyVec3(this.rotation, new Vec3(0, 1, 0));
    }

    public translate(newTranslation: Vec3){
        this.position.increment(newTranslation);
    }

    public rotate(b: Quat): void {
        const rot = this.rotation;
        
        const x = rot.w * b.x + rot.x * b.w + rot.y * b.z - rot.z * b.y;
        const y = rot.w * b.y + rot.y * b.w + rot.z * b.x - rot.x * b.z;
        const z = rot.w * b.z + rot.z * b.w + rot.x * b.y - rot.y * b.x;
        const w = rot.w * b.w - rot.x * b.x - rot.y * b.y - rot.z * b.z;
    
        this.rotation.x = x;
        this.rotation.y = y;
        this.rotation.z = z;
        this.rotation.w = w;
    }
    
    public rotateAxis(axis: Vec3): Vec3 {
        return Quat.rotateVector(this.rotation, axis);
    }
}