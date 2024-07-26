import Mathf from "../static/Mathf";

export default class Drawn {

    public static drawnWireRect(
        _ctx: CanvasRenderingContext2D,
        x: number, 
        y: number, 
        width: number,  
        height: number,
        rotation: number, 
        lineWidth: number,
        strokeColor: string 
    ): void {
        _ctx.save();

        _ctx.strokeStyle = strokeColor;
        _ctx.lineWidth = lineWidth;
    
        _ctx.translate(x, y);
        const rad = Mathf.degToRad(rotation);
        _ctx.rotate(rad);
        _ctx.strokeRect(0 , 0, width, height);

        _ctx.stroke();
        _ctx.restore();
    }


    /**
     * 
     * @param _ctx - O contexto 2D do canvas 
     * @param x - A posição X do objeto    
     * @param y - A posição Y do objeto 
     * @param width - A largura do objeto 
     * @param height - A altura do objeto 
     * @param centerX - O centro do objeto em X 
     * @param centerY - O centro do objeto em Y 
     * @param rotation - A rotação do objeto 
     * @param fillColor - A cor de preenchimento do objeto 
     * @param borderRadius - O raio dos cantos do objeto  
     */
    public static drawnRect (
        _ctx: CanvasRenderingContext2D, 
        x: number,
        y: number,
        width: number,
        height: number,
        centerX: number,
        centerY: number,
        rotation: number,
        fillColor: string, 
        borderRadius: { 
            lt: number, lb: number, rt: number, rb: number },
      
    ) {
        _ctx.save();
        _ctx.translate(x, y);
        _ctx.rotate(Mathf.degToRad(rotation));
    
        const lt = Mathf.clamp(borderRadius.lt, 0, Math.min(height / 2, width / 2));
        const lb = Mathf.clamp(borderRadius.lb, 0, Math.min(height / 2, width / 2));
        const rt = Mathf.clamp(borderRadius.rt, 0, Math.min(height / 2, width / 2));
        const rb = Mathf.clamp(borderRadius.rb, 0, Math.min(height / 2, width / 2));
    
        _ctx.beginPath();
        
        _ctx.moveTo(lt, 0);
        _ctx.lineTo(width - rt, 0); 
        _ctx.arcTo(width, 0, width, rt, rt);
        
        _ctx.lineTo(width, height - rb); 
        _ctx.arcTo(width, height, width - rb, height, rb);
        
        _ctx.lineTo(lb, height);
        _ctx.arcTo(0, height, 0, height - lb, lb); 

        _ctx.lineTo(0, rt);
        _ctx.arcTo(0, 0, lt, 0, lt);
        _ctx.closePath();
    
        _ctx.fillStyle = fillColor;
        _ctx.fill();
        _ctx.restore();
    }

  
    public static drawImage(
        _ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number,
        rotation: number,
        adjust: "fit" | "fill" | "stretch" | "center" = "fit"
    ): void {
        _ctx.save();
        _ctx.translate(x + width / 2, y + height / 2);
        _ctx.rotate(Mathf.degToRad(rotation));
        
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = -width / 2;
        let offsetY = -height / 2;
        
        switch (adjust) {
            case "fit":
                const fitScale = Math.min(width / image.width, height / image.height);
                drawWidth = image.width * fitScale;
                drawHeight = image.height * fitScale;
                offsetX = -drawWidth / 2;
                offsetY = -drawHeight / 2;
                break;
            case "fill":
                const fillScale = Math.max(width / image.width, height / image.height);
                drawWidth = image.width * fillScale;
                drawHeight = image.height * fillScale;
                offsetX = -drawWidth / 2;
                offsetY = -drawHeight / 2;
                break;
            case "stretch":
                drawWidth = width;
                drawHeight = height;
                offsetX = -drawWidth / 2;
                offsetY = -drawHeight / 2;
                break;
            case "center":
                drawWidth = image.width;
                drawHeight = image.height;
                offsetX = -drawWidth / 2;
                offsetY = -drawHeight / 2;
                break;
        }

        _ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
        _ctx.restore();
    }
}
