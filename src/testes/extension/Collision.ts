import Vector2 from "../../vector2";
import Mathf from "../static/Mathf";
import { Border as Border } from "./mouseBorderCollider";

export default class Collision {

    public static rectanglePoint(
        point: Vector2,
        position: Vector2,
        rotation: number,
        scale: Vector2,
    ): boolean {
        
        // Transforma o ponto para coordenadas relativas ao centro do retângulo
        const translatedX = point.x - position.x;
        const translatedY = point.y - position.y;
    
        // Aplica a rotação
        const cos = Mathf.cos(Mathf.degToRad(-rotation));
        const sin = Mathf.sin(Mathf.degToRad(-rotation));

        const rotatedX = translatedX * cos + translatedY * sin;
        const rotatedY = -translatedX * sin + translatedY * cos;
    
        // Transforma de volta para as coordenadas do retângulo
        const finalX = rotatedX + position.x;
        const finalY = rotatedY + position.y;
    
        // Verifica se o ponto está dentro dos limites do retângulo rotacionado
        return (
            finalX >= position.x &&
            finalX <= position.x + scale.x &&
            finalY >= position.y &&
            finalY <= position.y + scale.y
        );
    }
    
    public static borderPoint(
        point: Vector2,
        position: Vector2,
        rotation: number,
        scale: Vector2,
        offset: number = 5 // Tolerância ajustável, valor padrão é 5
    ): {border: Border, result: boolean} {
        
        // Transforma o ponto para coordenadas relativas ao centro do retângulo
        const translatedX = point.x - position.x;
        const translatedY = point.y - position.y;
    
        // Aplica a rotação
        const cos = Mathf.cos(Mathf.degToRad(-rotation));
        const sin = Mathf.sin(Mathf.degToRad(-rotation));
    
        const rotatedX = translatedX * cos + translatedY * sin;
        const rotatedY = -translatedX * sin + translatedY * cos;
    
        // Transforma de volta para as coordenadas do retângulo
        const finalX = rotatedX + position.x;
        const finalY = rotatedY + position.y;
    
        // Verifica se o ponto está na borda do retângulo rotacionado considerando o offset
        const left = position.x - offset;
        const right = position.x + scale.x + offset;
        const top = position.y - offset;
        const bottom = position.y + scale.y + offset;

        let border = Border.none;
    
        const onLeftEdge = finalX >= left && finalX <= position.x + offset && finalY >= position.y && finalY <= bottom;
        const onRightEdge = finalX <= right && finalX >= position.x + scale.x - offset && finalY >= position.y && finalY <= bottom;
        const onTopEdge = finalY >= top && finalY <= position.y + offset && finalX >= position.x && finalX <= right;
        const onBottomEdge = finalY <= bottom && finalY >= position.y + scale.y - offset && finalX >= position.x && finalX <= right;
        
        if(onLeftEdge){
            border = Border.inBorderLeft;
        }

        else if(onRightEdge){
            border = Border.inBorderRight;
        }

        else if(onTopEdge){
            border = Border.inBorderTop;
        }

        else if(onBottomEdge){
            border = Border.inBorderBottom;
        }
        return {border: border, result: onLeftEdge || onRightEdge || onTopEdge || onBottomEdge};

    }
    
    
    // public static circleCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
    //     return Mathf.distance(x1, y1, x2, y2) < r1 + r2;
    // }

    // public static circlePoint(x1: number, y1: number, r1: number, x2: number, y2: number): boolean {
    //     return Mathf.distance(x1, y1, x2, y2) < r1;
    // }

    // public static rectangleRectangle(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean {
    //     return (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2);
    // }

    // public static rectangleCircle(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, r2: number): boolean {
    //     const dx = x2 - Mathf.clamp(x2, x1, x1 + w1);
    //     const dy = y2 - Mathf.clamp(y2, y1, y1 + h1);
    //     return (dx * dx + dy * dy) < r2 * r2;
    // }

    // public static circleRectangle(x1: number, y1: number, r1: number, x2: number, y2: number, w2: number, h2: number): boolean {
    //     const dx = x1 - Mathf.clamp(x1, x2, x2 + w2);
    //     const dy = y1 - Mathf.clamp(y1, y2, y2 + h2);
    //     return (dx * dx + dy * dy) < r1 * r1;
    // }
}
