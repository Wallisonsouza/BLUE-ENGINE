// import EngineCache from "../Cache/EngineCache";
// import Mathf from "./Mathf";

// export default class Gizmos {
//     public static color = "white";

//     public static drawWireRect(x: number, y: number, width: number, height: number, rotation: number = 0, originX: number = 0.5, originY: number = 0.5){
//         const context = EngineCache.getContext();
//         const rotatedPos = Mathf.rotateAround(x, y, x + width * originX, y + height * originY, -rotation);
//         context.save();
//         context.translate(rotatedPos.x, rotatedPos.y);
//         context.rotate(Mathf.degToRad(-rotation));
//         context.strokeStyle = Gizmos.color;
//         context.strokeRect(0, 0, width, height);
//         context.restore();
//     }

//     public static drawRect(x: number, y: number, width: number, height: number, rotation: number = 0, originX: number = 0.5, originY: number = 0.5){
//         const context = EngineCache.getContext();
//         const rotatedPos = Mathf.rotateAround(x, y, x + width * originX, y + height * originY, -rotation);
//         context.save();
//         context.translate(rotatedPos.x, rotatedPos.y);
//         context.rotate(Mathf.degToRad(-rotation));
//         context.fillStyle = Gizmos.color;
//         context.fillRect(0, 0, width, height);
//         context.restore();
//     }
// }