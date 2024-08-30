// import Rect from "../components/Rect";
// import Mathf from "../Core/Math/Mathf";

// export default class Physics {
//     public static pointCollision(mousePosition: {x: number, y: number}, rect: Rect, negative: boolean = true): boolean {
//         const positionOffset = rect.getRotatedPosition();
//         const translatedX = mousePosition.x - positionOffset.x;
//         const translatedY = mousePosition.y - positionOffset.y;
//         const rotated = Mathf.rotatePoint(translatedX, translatedY, -rect.rotation);
//         const finalX = rotated.x + positionOffset.x;
//         const finalY = rotated.y + positionOffset.y;

//         const minX = negative ? Math.min(positionOffset.x, positionOffset.x + rect.width) : positionOffset.x;
//         const maxX = negative ? Math.max(positionOffset.x, positionOffset.x + rect.width) : positionOffset.x + rect.width;
//         const minY = negative ? Math.min(positionOffset.y, positionOffset.y + rect.height) : positionOffset.y;
//         const maxY = negative ? Math.max(positionOffset.y, positionOffset.y + rect.height) : positionOffset.y + rect.height;

//         return finalX >= minX && finalX <= maxX && finalY >= minY && finalY <= maxY;
//     }
// }
