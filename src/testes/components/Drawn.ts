import Vector2 from "../../vector2";
import Mathf from "../static/Mathf";
import Transform from "./Transform";

export default class Drawn {

    public static drawnWireRect(_ctx: CanvasRenderingContext2D, position: Vector2, rotation: number, scale: Vector2, lineWidth: number, strokeColor: string ): void {
        _ctx.save();

        _ctx.strokeStyle = strokeColor;
        _ctx.lineWidth = lineWidth;
    
        const originX = position.x;
        const originY = position.y;
    
        _ctx.translate(originX, originY);
        _ctx.rotate(rotation);
        _ctx.strokeRect(0 , 0, scale.x, scale.y);

        _ctx.stroke();

        _ctx.restore();
    }

    public static drawnFillCircle(_ctx: CanvasRenderingContext2D, position: Vector2, radius: number, fillColor: string): void {
        _ctx.beginPath();
        _ctx.arc(position.x, position.y, radius, 0, Mathf.PI * 2);
        _ctx.fillStyle = fillColor;
        _ctx.fill();
        _ctx.closePath();
    }

    public static square(
        _ctx: CanvasRenderingContext2D, 
        transform: Transform,
        fillColor: string, 
        strokeColor: string, 
        lineWidth: number, 
        borderRadius: { lt: number, lb: number, rt: number, rb: number },
    ) {
        _ctx.save();
    
        const position = transform.getPosition();
        const radians = transform.getRadians();
        const origin = position.add(transform.size.multiply(transform.getOrigin()));
        const rotatedPosition = Mathf.rotateAround(position, origin, radians);
        _ctx.translate(rotatedPosition.x, rotatedPosition.y);
        _ctx.rotate(radians);
    
        const width = transform.size.x;
        const height = transform.size.y;
    
        const lt = Mathf.clamp(borderRadius.lt, 0, Math.min(height / 2, width / 2));
        const lb = Mathf.clamp(borderRadius.lb, 0, Math.min(height / 2, width / 2));
        const rt = Mathf.clamp(borderRadius.rt, 0, Math.min(height / 2, width / 2));
        const rb = Mathf.clamp(borderRadius.rb, 0, Math.min(height / 2, width / 2));
    
        // Desenhar o quadrado com cantos arredondados
        _ctx.beginPath();
        _ctx.moveTo(lt, 0); // Top-left corner
        _ctx.lineTo(width - rt, 0); // Top-right corner
        _ctx.arcTo(width, 0, width, rt, rt); // Top-right corner
        _ctx.lineTo(width, height - rb); // Bottom-right corner
        _ctx.arcTo(width, height, width - rb, height, rb); // Bottom-right corner
        _ctx.lineTo(lb, height); // Bottom-left corner
        _ctx.arcTo(0, height, 0, height - lb, lb); // Bottom-left corner
        _ctx.lineTo(0, rt); // Top-left corner
        _ctx.arcTo(0, 0, lt, 0, lt); // Top-left corner
        _ctx.closePath();
    
        // Preencher o quadrado
        _ctx.fillStyle = fillColor;
        _ctx.fill();
        _ctx.strokeStyle = strokeColor;
        _ctx.lineWidth = lineWidth;
        _ctx.stroke();
        _ctx.restore();

        this.drawnFillCircle(_ctx, origin, 5, "red");
    }
}