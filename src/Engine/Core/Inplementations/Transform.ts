import Gizmos from "../../graphycs/Gizmos";
import Color from "../../static/color";
import Mat4 from "../Math/Mat4";
import Quat from "../Math/Quat";
import Vec3 from "../Math/Vec3";
import { IGizmoRenderable } from "../interfaces/IGizmoRenderable";
import { ITransform } from "../interfaces/ITransform";
import Camera from "./Camera";

/**
 * Representa a transformação de um objeto no espaço 3D, incluindo sua posição, rotação e escala.
 * Esta classe implementa a interface `ITransform` e fornece métodos para calcular direções baseadas na rotação do objeto.
 */
export default class Transform implements ITransform, IGizmoRenderable {
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

    public drawGizmos() {
        const cameraPosition = Camera.currentCamera.transform.position;
        const distance = Math.max(0.1, Vec3.distance(this.position, cameraPosition));
        const scale = 0.1 * distance;
    
        // Transforme os vetores dos eixos locais usando o quaternion de rotação
        const globalXAxis = Quat.multiplyVec3(this.rotation, Vec3.left).normalize().multiplyScalar(scale);
        const globalYAxis = Quat.multiplyVec3(this.rotation, Vec3.up).normalize().multiplyScalar(scale);
        const globalZAxis = Quat.multiplyVec3(this.rotation, Vec3.forward).normalize().multiplyScalar(scale);
    
        // Calcule os pontos finais
        const xEnd = this.position.add(globalXAxis);
        const yEnd = this.position.add(globalYAxis);
        const zEnd = this.position.add(globalZAxis);
    
        // Desenhe os gizmos
        Gizmos.color = Color.red;
        Gizmos.drawLine(this.position, xEnd);
        Gizmos.drawFillCube(xEnd, new Vec3(0.1 * scale, 0.1 * scale, 0.1 * scale));
    
        Gizmos.color = Color.green;
        Gizmos.drawLine(this.position, yEnd);
        Gizmos.drawFillCube(yEnd, new Vec3(0.1 * scale, 0.1 * scale, 0.1 * scale));
    
        Gizmos.color = Color.blue;
        Gizmos.drawLine(this.position, zEnd);
        Gizmos.drawFillCube(zEnd, new Vec3(0.1 * scale, 0.1 * scale, 0.1 * scale));
    }
}