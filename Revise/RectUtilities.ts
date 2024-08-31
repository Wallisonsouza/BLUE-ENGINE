// import Rect from "../components/Rect";
// import { Border } from "../Enum/Border";
// import Mathf from "./Mathf";

// export default class RectUtilities {
//     public static resizeLeft(rect: Rect, value: number): void {
//         const positionBefore = rect.rotatedPosition;
//         rect.width -= value;
//         const positionAfter = rect.rotatedPosition;
//         rect.x += positionAfter.x - positionBefore.x;
//         rect.y += positionAfter.y - positionBefore.y;
//         rect.x += value;
//     }

//     public static resizeRight(rect: Rect, value: number): void {
//         const positionBefore = rect.rotatedPosition;
//         rect.width += value;
//         const positionAfter = rect.rotatedPosition;
//         rect.x -= positionAfter.x - positionBefore.x;
//         rect.y -= positionAfter.y - positionBefore.y;
//     }

//     public static resizeTop(rect: Rect, value: number): void {
//         const positionBefore = rect.rotatedPosition;
//         rect.height -= value;
//         const positionAfter = rect.rotatedPosition;
//         rect.x += positionAfter.x - positionBefore.x;
//         rect.y += positionAfter.y - positionBefore.y;
//         rect.y += value;
//     }

//     public static resizeBottom(rect: Rect, value: number): void {
//         const positionBefore = rect.rotatedPosition;
//         rect.height += value;
//         const positionAfter = rect.rotatedPosition;
//         rect.y -= positionAfter.y - positionBefore.y;
//         rect.x -= positionAfter.x - positionBefore.x;
//     }

//     public static checkBorder(
//         mouseX: number, 
//         mouseY: number, 
//         rect: Rect,
//         offset: number, 
    
//     ): Border {
//         const rotatedRect = rect.getRotatedPosition();
//         const edge = rect.getEdges();

//         const translatedPositionX = mouseX - rotatedRect.x;
//         const translatedPositionY = mouseY - rotatedRect.y;

//         const rotatedPosition = Mathf.rotatePoint(translatedPositionX, translatedPositionY, -rect.rotation); 
//         const finalPositionX = rotatedRect.x + rotatedPosition.x;
//         const finalPositionY = rotatedRect.y + rotatedPosition.y;
      
//         const onTopEdge = finalPositionY >= edge.top - offset
//         && finalPositionY <= rotatedRect.y + offset
//         && finalPositionX >= (rect.width < 0 ? edge.right : rotatedRect.x)
//         && finalPositionX <= (rect.width < 0 ? rotatedRect.x : edge.right);

//         const onBottomEdge = finalPositionY <= edge.bottom + offset
//         && finalPositionY >= rotatedRect.y + rect.height - offset
//         && finalPositionX >= (rect.width < 0 ? edge.right : rotatedRect.x)
//         && finalPositionX <= (rect.width < 0 ? rotatedRect.x : edge.right);

//         const onLeftEdge = finalPositionX >= edge.left - offset && 
//         finalPositionX <= rotatedRect.x + offset 
//         && finalPositionY >= (rect.height < 0 ? edge.bottom : rotatedRect.y)
//         && finalPositionY <= (rect.height < 0 ? rotatedRect.y : edge.bottom);

//         const onRightEdge = finalPositionX <= edge.right + offset
//         && finalPositionX >= rotatedRect.x + rect.width - offset
//         && finalPositionY >= (rect.height < 0 ? edge.bottom : rotatedRect.y)
//         && finalPositionY <= (rect.height < 0 ? rotatedRect.y : edge.bottom);
        
//         if(onLeftEdge && onTopEdge) return Border.LeftTop;
//         if(onRightEdge && onTopEdge) return Border.RightTop;
//         if(onLeftEdge && onBottomEdge) return Border.LeftBottom;
//         if(onRightEdge && onBottomEdge) return Border.RightBottom;

//         if (onLeftEdge) return Border.Left;
//         if (onRightEdge) return Border.Right;
//         if (onTopEdge) return Border.Top;
//         if (onBottomEdge) return Border.Bottom;
    
//         return Border.None;
//     }
// }

