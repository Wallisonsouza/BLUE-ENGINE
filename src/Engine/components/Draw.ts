import Mathf from "../static/Mathf";

export default class Draw {
    
    public static drawnWireRect(

        ctx: CanvasRenderingContext2D,  
        width: number,
        height: number,
        fillColor: string, 
    ){
        ctx.strokeStyle = "red";
        ctx.strokeRect(0, 0, width, height);
    }

    public static drawnRect (
        _ctx: CanvasRenderingContext2D, 
        width: number,
        height: number,
        fillColor: string, 
        borderRadius: { 
            lt: number, lb: number, rt: number, rb: number 
        },
      
    ) {

        const absWidth = Mathf.abs(width);
        const absHeight = Mathf.abs(height);
        const lt = Mathf.getValidRadius(borderRadius.lt, absHeight, absWidth);
        const lb = Mathf.getValidRadius(borderRadius.lb, absHeight, absWidth);
        const rt = Mathf.getValidRadius(borderRadius.rt, absHeight, absWidth);
        const rb = Mathf.getValidRadius(borderRadius.rb, absHeight, absWidth);

        _ctx.beginPath();
        
        if (width >= 0 && height >= 0) {
            _ctx.moveTo(lt, 0);
            _ctx.lineTo(absWidth - rt, 0); 
            _ctx.arcTo(absWidth, 0, absWidth, rt, rt);
            
            _ctx.lineTo(absWidth, absHeight - rb); 
            _ctx.arcTo(absWidth, absHeight, absWidth - rb, absHeight, rb);
            
            _ctx.lineTo(lb, absHeight);
            _ctx.arcTo(0, absHeight, 0, absHeight - lb, lb); 
            
            _ctx.lineTo(0, lt);
            _ctx.arcTo(0, 0, lt, 0, lt);
        } else if (width < 0 && height >= 0) {
            _ctx.moveTo(-lt, 0);
            _ctx.lineTo(-absWidth + rt, 0);
            _ctx.arcTo(-absWidth, 0, -absWidth, rt, rt);
            
            _ctx.lineTo(-absWidth, absHeight - rb);
            _ctx.arcTo(-absWidth, absHeight, -absWidth + rb, absHeight, rb);
            
            _ctx.lineTo(-lb, absHeight);
            _ctx.arcTo(0, absHeight, 0, absHeight - lb, lb);
            
            _ctx.lineTo(0, lt);
            _ctx.arcTo(0, 0, -lt, 0, lt);
        } else if (width >= 0 && height < 0) {
            _ctx.moveTo(lt, 0);
            _ctx.lineTo(absWidth - rt, 0);
            _ctx.arcTo(absWidth, 0, absWidth, -rt, rt);
            
            _ctx.lineTo(absWidth, -absHeight + rb);
            _ctx.arcTo(absWidth, -absHeight, absWidth - rb, -absHeight, rb);
            
            _ctx.lineTo(lb, -absHeight);
            _ctx.arcTo(0, -absHeight, 0, -absHeight + lb, lb);
            
            _ctx.lineTo(0, -lt);
            _ctx.arcTo(0, 0, lt, 0, lt);
        } else {
            _ctx.moveTo(-lt, 0);
            _ctx.lineTo(-absWidth + rt, 0);
            _ctx.arcTo(-absWidth, 0, -absWidth, -rt, rt);
            
            _ctx.lineTo(-absWidth, -absHeight + rb);
            _ctx.arcTo(-absWidth, -absHeight, -absWidth + rb, -absHeight, rb);
            
            _ctx.lineTo(-lb, -absHeight);
            _ctx.arcTo(0, -absHeight, 0, -absHeight + lb, lb);
            
            _ctx.lineTo(0, -lt);
            _ctx.arcTo(0, 0, -lt, 0, lt);
        }
        
        _ctx.closePath();
        _ctx.fillStyle = fillColor;
        _ctx.fill();
    }
    public static drawImage(
        _ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        width: number,
        height: number,
        adjust: "fit" | "fill" | "stretch" | "center" | "repeat" = "stretch",
        clip: boolean = false
    ): void {

        if(clip){
            _ctx.clip();
        }
        
        let drawWidth = width;
        let drawHeight = height;
    
        switch (adjust) {
            case "fit":
                const fitScale = Mathf.min(width / image.width, height / image.height);
                drawWidth = image.width * fitScale;
                drawHeight = image.height * fitScale;
                break;
            case "fill":
                const fillScale = Mathf.max(width / image.width, height / image.height);
                drawWidth = image.width * fillScale;
                drawHeight = image.height * fillScale;
                break;
            case "stretch":
                drawWidth = width;
                drawHeight = height;
                break;
            case "center":
                drawWidth = image.width;
                drawHeight = image.height;
                break;
        }
        _ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
    }
}