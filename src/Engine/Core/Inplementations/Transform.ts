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
        return Quat.multiplyVec3(this.rotation, Vec3.forward);
    }
    getUpDirection(): Vec3 {
        return Quat.multiplyVec3(this.rotation, new Vec3(0, 1, 0));
    }

    public translate(newTranslation: Vec3){
        this.position.increment(newTranslation);
    }
    
    public rotateAxis(axis: Vec3): Vec3 {
        return Quat.rotateVector(this.rotation, axis);
    }

    public getModelMatrix(){
        return Mat4.model(this.position, this.rotation, this.scale);
    }

    public getRotationMatrix(){
        return Mat4.rotate(this.rotation);
    }

    public getTranslationMatrix(){
        return Mat4.translate(this.position);
    }

    public getScaleMatrix(){
        return Mat4.scale(this.scale);
    }
}