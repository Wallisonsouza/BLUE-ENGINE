// import Vector2 from "../../vector2";
// import Collider from "../base/base_collider";
// import Camera from "./Camera";
// import Polygon from "./Polygon";

// export default class SATCollider extends Collider {

//     private isOverlapping([minA, maxA]: [number, number], [minB, maxB]: [number, number]): boolean {
//         return maxA >= minB && maxB >= minA;
//     }

   
//     // private SATCollision(polyA: Polygon, polyB: Polygon): boolean {
//     //     const edgesA = polyA.edges();
//     //     const edgesB = polyB.edges();
        
//     //     for (const edge of edgesA.concat(edgesB)) {
//     //         const axis = edge.perp().normalize();
//     //         const projectionA = polyA.project(axis);
//     //         const projectionB = polyB.project(axis);
        
//     //         if (!this.isOverlapping(projectionA, projectionB)) {
//     //             return false;
//     //         }
//     //     }
        
//     //     return true;
//     // }

//     private SATCollisionPoint(poly: Polygon, point: Vector2): boolean {
//         const center = poly.center();

//         // Rotaciona os vértices do polígono de acordo com a rotação fornecida
//         const rotatedVertices = poly.vertices.map(vertex => {
//             const translatedVertex = vertex.subtract(center);
//             const rotatedVertex = Vector2.rotatePoint(translatedVertex, this.transform.rotation);
//             return rotatedVertex.add(center);
//         });
    
//         // Gera as arestas do polígono rotacionado
//         const edges = [];
//         for (let i = 0; i < rotatedVertices.length; i++) {
//             const nextIndex = (i + 1) % rotatedVertices.length;
//             const edge = rotatedVertices[nextIndex].subtract(rotatedVertices[i]);
//             edges.push(edge);
//         }

//         for (const edge of edges) {
//             const axis = edge.perp().normalize();
//             const projectionPoly = this.projectPolygon(rotatedVertices, axis);
//             const projectionPoint = point.dot(axis); // Produto escalar para projetar o ponto no eixo

//             // Verifica se o ponto está fora do intervalo da projeção do polígono
//             if (projectionPoint < projectionPoly[0] || projectionPoint > projectionPoly[1]) {
//                 return false;
//             }
//         }

//         return true;
//     }
//     // Método auxiliar para projetar os vértices do polígono rotacionado em um eixo
//     private projectPolygon(vertices: Vector2[], axis: Vector2): [number, number] {
//         let min = vertices[0].dot(axis);
//         let max = min;
//         for (const vertex of vertices) {
//             const projection = vertex.dot(axis);
//             if (projection < min) min = projection;
//             if (projection > max) max = projection;
//         }
//         return [min, max];
//     }
//         override collisionPoint(_camera: Camera, _pointPosition: Vector2): boolean {
//         return this.SATCollisionPoint(this.transform.polygon, _pointPosition);
//     }

//     override renderer(_ctx: CanvasRenderingContext2D, _camera: Camera): void {
//         _ctx.save(); // Salva o estado atual do contexto
    
//         // Desenha o polígono em relação ao novo sistema de coordenadas
//         _ctx.strokeStyle = this.color.toString();
//         _ctx.lineWidth = this.drawnWidth;
//         _ctx.beginPath();
//        this.transform.polygon.vertices.forEach((point, index) => {
           
//             const rotatedPoint = Vector2.rotatePoint(point, this.transform.rotation);
//             const newX = rotatedPoint.x;
//             const newY = rotatedPoint.y;
//             if (index === 0) {
//                 _ctx.moveTo(newX, newY);
//             } else {
//                 _ctx.lineTo(newX, newY);
//             }
//         });
//         _ctx.closePath();
//         _ctx.stroke();
    
//         _ctx.restore(); // Restaura o estado original do contexto
//     }
    
// }


      
  