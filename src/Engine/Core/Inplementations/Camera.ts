import Mat4 from "../../graphycs/matrix4x4";
import Vec3 from "../../graphycs/vec3";
import { ICamera } from "../interfaces/ICamera";
import Transform from "./Transform";

/**
 * Representa uma câmera no espaço 3D que pode ser usada para capturar e renderizar a cena.
 * Esta classe implementa a interface `ICamera` e fornece funcionalidades para definir e obter
 * as transformações da câmera, bem como as matrizes de visualização e projeção.
 */
export  default class Camera implements ICamera {
    fieldOfView: number = 60;
    transform: Transform = new Transform(new Vec3(0, 0, -10));
    nearPlane: number = 0.03;
    farPlane: number = 1000;
    aspectRatio: number = 16/9;
    depth: boolean = true;

    getViewMatrix(): Mat4 {
        const position = this.transform.position;
        const forward = this.transform.getForwardDirection();
        const upWards = this.transform.getUpDirection();
        
        return Mat4.lookTo(position, forward, upWards)
    }
   
    getProjectionMatrix(): Mat4 {
        const fov = this.fieldOfView;
        const aspect = this.aspectRatio;
        const near = this.nearPlane;
        const far = this.farPlane;

        // return Mat4.orthographic(1, -1, -1, 1, near, far);
        return Mat4.perspective(fov, aspect, near, far);
    }
}