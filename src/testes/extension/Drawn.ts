import Vector2 from "../../vector2";
import Mathf from "../static/Mathf";
import Camera from "./Camera";

export default class Drawn {

    public static drawnWireRect(_ctx: CanvasRenderingContext2D, position: Vector2, rotation: number, scale: Vector2, lineWidth: number, strokeColor: string ): void {
        _ctx.save();

        _ctx.strokeStyle = strokeColor;
        _ctx.lineWidth = lineWidth;
    
        const originX = position.x;
        const originY = position.y;
    
        _ctx.translate(originX, originY);
        _ctx.rotate(Mathf.degToRad(-rotation));
        _ctx.strokeRect(0 , 0, scale.x, scale.y);

        _ctx.stroke();

        _ctx.restore();
    }

    public static drawnFillRect(_ctx: CanvasRenderingContext2D, position: Vector2, rotation: number, scale: Vector2, pivot: Vector2, fillColor: string ): void {
        _ctx.save();

        _ctx.fillStyle = fillColor;
    
        const originX = position.x + pivot.x;
        const originY = position.y + pivot.y;
    
        _ctx.translate(originX, originY);
        _ctx.rotate(Mathf.degToRad(rotation));
        _ctx.translate(-originX, -originY);

        _ctx.fillRect(position.x, position.y, scale.x, scale.y);

        _ctx.fill();

        _ctx.restore();
    }

    public static square(
        _ctx: CanvasRenderingContext2D, 
        position: Vector2, 
        rotation: number, 
        scale: Vector2, 
        fillColor: string, 
        strokeColor: string, 
        lineWidth: number, 
        borderRadius: { lt: number, lb: number, rt: number, rb: number }
    ) {
        _ctx.save();
    
        // Move o contexto para a posição do canto superior esquerdo do quadrado
        _ctx.translate(position.x, position.y);
        
        // Rotaciona em torno do canto superior esquerdo do quadrado
        _ctx.rotate(Mathf.degToRad(-rotation));
    
        // Tamanho do quadrado
        const width = scale.x;
        const height = scale.y;
        
        // Raio dos cantos arredondados
        const lt = borderRadius.lt;
        const lb = borderRadius.lb;
        const rt = borderRadius.rt;
        const rb = borderRadius.rb;
        
        _ctx.fillStyle = fillColor;
        _ctx.lineWidth = lineWidth;
        _ctx.strokeStyle = strokeColor;
        
        _ctx.beginPath();
        _ctx.moveTo(lt, 0); // Canto superior esquerdo
        _ctx.lineTo(width - rt, 0); // Canto superior direito
        _ctx.arcTo(width, 0, width, rt, rt); // Canto superior direito
        _ctx.lineTo(width, height - rb); // Canto inferior direito
        _ctx.arcTo(width, height, width - rb, height, rb); // Canto inferior direito
        _ctx.lineTo(lb, height); // Canto inferior esquerdo
        _ctx.arcTo(0, height, 0, height - lb, lb); // Canto inferior esquerdo
        _ctx.lineTo(0, rt); // Canto superior esquerdo
        _ctx.arcTo(0, 0, lt, 0, lt); // Canto superior esquerdo
        _ctx.closePath();
        
        _ctx.fill();
        _ctx.stroke();
        
        _ctx.restore();
    }
    
    
}
