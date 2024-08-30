import Mat4 from "../Math/Mat4";
import Color from "../../static/color";
import Transform from "./Transform";
import Component from "../../components/Component";

export default class Camera extends Component {
   
    public static currentCamera: Camera = new Camera();
    public transform: Transform = new Transform();

    public fieldOfView: number = 60;
    public aspectRatio: number = 16 / 9;
    public nearPlane: number = 0.03;
    public farPlane: number = 1000;
   
    public depth: boolean = true;
    public clearColor: Color = Color.black;

    getViewMatrix(): Mat4 {
        const position = this.transform.position;
        const forward = this.transform.getBackwardDirection();
        const upWards = this.transform.getUpDirection();

        return Mat4.lookTo(position, forward, upWards);
    }

    getProjectionMatrix(): Mat4 {
        const fov = this.fieldOfView;
        const aspect = this.aspectRatio;
        const near = this.nearPlane;
        const far = this.farPlane;

        return Mat4.perspective(fov, aspect, near, far);
    }

    // drawCameraGizmos(glLink: WebGLLink) {
    //     this.drawPerspectiveGizmos(glLink)
    // }

    // private drawPerspectiveGizmos(glLink: WebGLLink) {
    //     const tan = 2 * Math.tan(this.fieldOfView * 0.5 * Math.PI / 180);
    //     const nearHeight = tan * this.nearPlane;
    //     const nearWidth = nearHeight * this.aspectRatio;
    //     const farHeight = tan * this.farPlane;
    //     const farWidth = farHeight * this.aspectRatio;
    
    //     const position = this.transform.position;
    //     const forward = Vec3.normalize(this.transform.getForwardDirection());
    //     const up = Vec3.normalize(this.transform.getUpDirection());
    //     const right = Vec3.normalize(forward.cross(up));
    
    //     const nearCenter = position.add(forward.scale(this.nearPlane));
    //     const farCenter = position.add(forward.scale(this.farPlane));
    
    //     const nearCorners = this.calculateFrustumCorners(nearCenter, up, right, nearWidth, nearHeight);
    //     const farCorners = this.calculateFrustumCorners(farCenter, up, right, farWidth, farHeight);
    
    //     // Desenhar planos near e far
    //     this.drawFrustumPlane(glLink, nearCorners);
    //     this.drawFrustumPlane(glLink, farCorners);
    
    //     // Conectar os planos near e far
    //     for (let i = 0; i < 4; i++) {
    //         glLink.drawSimpleLine(nearCorners[i], farCorners[i]);
    //     }
    
  
    // }
    
    // /**
    //  * Calcula os cantos de um plano frustum.
    //  * @param center O ponto central do plano.
    //  * @param up Vetor up da câmera.
    //  * @param right Vetor right da câmera.
    //  * @param width A largura do plano.
    //  * @param height A altura do plano.
    //  * @returns Um array de quatro vetores representando os cantos do plano.
    //  */
    // private calculateFrustumCorners(center: Vec3, up: Vec3, right: Vec3, width: number, height: number): Vec3[] {
    //     const halfWidth = width / 2;
    //     const halfHeight = height / 2;

    //     return [
    //         center.add(up.scale(halfHeight)).subtract(right.scale(halfWidth)),  // Top Left
    //         center.add(up.scale(halfHeight)).add(right.scale(halfWidth)),      // Top Right
    //         center.subtract(up.scale(halfHeight)).subtract(right.scale(halfWidth)),  // Bottom Left
    //         center.subtract(up.scale(halfHeight)).add(right.scale(halfWidth))   // Bottom Right
    //     ];
    // }

    // private drawFrustumPlane(glLink: WebGLLink, corners: Vec3[]): void {
    //     glLink.drawSimpleLine(corners[0], corners[1]); 
    //     glLink.drawSimpleLine(corners[1], corners[3]); 
    //     glLink.drawSimpleLine(corners[3], corners[2]); 
    //     glLink.drawSimpleLine(corners[2], corners[0]);
    // }
    
    // drawAxes(glLink: WebGLLink, length: number = 1) {
    //     const origin = this.transform.position;
        
    //     // Aplicar rotação para calcular a direção dos eixos
    //     const forward = this.transform.getForwardDirection();
    //     const right = Vec3.normalize(forward.cross(this.transform.getUpDirection()));
    //     const up = this.transform.getUpDirection();
    
    //     // Eixo X em vermelho
    //     const xAxisEnd = origin.add(right.scale(length));
    //     glLink.drawSimpleLine(origin, xAxisEnd, Color.red);
    
    //     // Eixo Y em verde
    //     const yAxisEnd = origin.add(up.scale(length));
    //     glLink.drawSimpleLine(origin, yAxisEnd, Color.green);
    
    //     // Eixo Z em azul
    //     const zAxisEnd = origin.add(forward.scale(length));
    //     glLink.drawSimpleLine(origin, zAxisEnd, Color.blue);
    // }
    
}
