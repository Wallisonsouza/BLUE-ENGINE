// import Vector2 from "../../vector2";
// import Collider from "../base/base_collider";
// import Camera from "../extension/Camera";
// import RectTransform from "../extension/rect";

// export class SeparatingAxisTheorem {
//     public static isColliding(a: SATCollider, b: SATCollider): boolean {
//         let axes = a.getAxes().concat(b.getAxes());
//         for (let i = 0; i < axes.length; i++) {
//             let axis = axes[i];
//             let projectionA = a.project(axis);
//             let projectionB = b.project(axis);
//             if (!projectionA.isOverlapping(projectionB)) {
//                 return false;
//             }
//         }
//         return true;
//     }

//     public static isPointColliding(object: SATCollider, point: Vector2): boolean {
//         let axes = object.getAxes();
//         for (let axis of axes) {
//             let projection = object.project(axis);
//             let pointProjection = point.dot(axis);
          
//             if (pointProjection < projection.min || pointProjection > projection.max) {
//                 return false;
//             }
//         }
//         return true;
//     }
// }

// export default class SATCollider extends Collider {
//     public points: Vector2[] = [];

//     constructor() {
//         super();
//     }

//     public project(axis: Vector2): Projection {
//         let scalars = this.points.map((point) => {
//             let rotatedPoint = Vector2.rotatePoint(point, this.transform.rotation);
//             return rotatedPoint.dot(axis);
//         });
//         return new Projection(Math.min(...scalars), Math.max(...scalars));
//     }

//     public getAxes(): Vector2[] {
//         let axes: Vector2[] = [];
//         for (let i = 0; i < this.points.length; i++) {
//             let p1 = Vector2.rotatePoint(this.points[i], this.transform.rotation);
//             let p2 = Vector2.rotatePoint(this.points[(i + 1) % this.points.length], this.transform.rotation);
//             let edge = p1.subtract(p2);
//             axes.push(edge.normal());
//         }
//         return axes;
//     }
    
//     public override renderer(ctx: CanvasRenderingContext2D, camera: Camera, transform: RectTransform): void {
//         // Calcular o centro do objeto
//         let centerX = this.points.reduce((acc, p) => acc + p.x, 0) / this.points.length;
//         let centerY = this.points.reduce((acc, p) => acc + p.y, 0) / this.points.length;
    
//         ctx.beginPath();
//         ctx.strokeStyle = this.color.toString();
//         ctx.lineWidth = this.drawnWidth;
    
//         // Aplicar rotação e posição ao primeiro ponto e mover para ele
//         let {x: firstX, y: firstY} = this.rotatePoint(this.points[0], centerX, centerY, this.transform.rotation);
//         ctx.moveTo(firstX + transform.position.x, firstY + transform.position.y);
    
//         // Loop através dos pontos, aplicar rotação e posição, e desenhar linhas
//         for (let i = 1; i < this.points.length; i++) {
//             let {x, y} = this.rotatePoint(this.points[i], centerX, centerY, this.transform.rotation);
//             ctx.lineTo(x + transform.position.x, y + transform.position.y);
//         }
    
//         ctx.closePath();
//         ctx.stroke();
//     }
//     private rotatePoint(point: Vector2, centerX: number, centerY: number, angle: number): Vector2 {
//         let rad = angle * Math.PI / 180; // Convertendo graus para radianos, se necessário
//         let cos = Math.cos(rad);
//         let sin = Math.sin(rad);
    
//         return new Vector2(
//             cos * (point.x - centerX) - sin * (point.y - centerY) + centerX,
//             sin * (point.x - centerX) + cos * (point.y - centerY) + centerY
//         );
//     }
//     public override collisionPoint(camera: Camera, mousePosition: Vector2): boolean {
//         return SeparatingAxisTheorem.isPointColliding(this, mousePosition);
    
//     }
// }

// export class Projection {
//     public min: number;
//     public max: number;

//     constructor(min: number, max: number) {
//         this.min = min;
//         this.max = max;
//     }

//     public isOverlapping(projection: Projection): boolean {
//         return this.max > projection.min && projection.max > this.min;
//     }
// }


// // class Vector2 {
// //     constructor(public x: number, public y: number) {}
  
// //     subtract(other: Vector2): Vector2 {
// //       return new Vector2(this.x - other.x, this.y - other.y);
// //     }
  
// //     dot(other: Vector2): number {
// //       return this.x * other.x + this.y * other.y;
// //     }
  
// //     perp(): Vector2 {
// //       return new Vector2(-this.y, this.x);
// //     }
  
// //     normalize(): Vector2 {
// //       const length = Math.sqrt(this.x * this.x + this.y * this.y);
// //       return new Vector2(this.x / length, this.y / length);
// //     }
// //   }
  
// //   class Polygon {
// //     constructor(public vertices: Vector2[]) {}
  
// //     edges(): Vector2[] {
// //       const edges: Vector2[] = [];
// //       for (let i = 0; i < this.vertices.length; i++) {
// //         const nextIndex = (i + 1) % this.vertices.length;
// //         edges.push(this.vertices[nextIndex].subtract(this.vertices[i]));
// //       }
// //       return edges;
// //     }
  
// //     project(axis: Vector2): [number, number] {
// //       let min = axis.dot(this.vertices[0]);
// //       let max = min;
// //       for (const vertex of this.vertices) {
// //         const projection = axis.dot(vertex);
// //         if (projection < min) min = projection;
// //         if (projection > max) max = projection;
// //       }
// //       return [min, max];
// //     }
// //   }
  
// //   function isOverlapping([minA, maxA]: [number, number], [minB, maxB]: [number, number]): boolean {
// //     return maxA >= minB && maxB >= minA;
// //   }
  
// //   function SATCollision(polyA: Polygon, polyB: Polygon): boolean {
// //     const edgesA = polyA.edges();
// //     const edgesB = polyB.edges();
  
// //     for (const edge of edgesA.concat(edgesB)) {
// //       const axis = edge.perp().normalize();
// //       const projectionA = polyA.project(axis);
// //       const projectionB = polyB.project(axis);
  
// //       if (!isOverlapping(projectionA, projectionB)) {
// //         return false;
// //       }
// //     }
  
// //     return true;
// //   }