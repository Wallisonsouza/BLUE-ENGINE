// import EngineCache from "../Cache/EngineCache";
// import Mathf from "../Core/Math/Mathf";
// import Options from "../static/Optios";
// import Rect, { Vertice } from "./Rect";

// export default class Draw {
    
//     public static drawnWireRect(

//         ctx: CanvasRenderingContext2D,  
//         width: number,
//         height: number,
//         strokeStyle: string, 
//     ){
//         ctx.strokeStyle = strokeStyle;
//         ctx.strokeRect(0, 0, width, height);
//     }

//     public static drawRect (
//         ctx: CanvasRenderingContext2D, 
//         width: number,
//         height: number,
//         fillColor: string, 
//         borderRadius: { 
//             lt: number, lb: number, rt: number, rb: number 
//         },
//     ) {
//         const absWidth = Mathf.abs(width);
//         const absHeight = Mathf.abs(height);
//         const lt = Mathf.getValidRadius(borderRadius.lt, absHeight, absWidth);
//         const lb = Mathf.getValidRadius(borderRadius.lb, absHeight, absWidth);
//         const rt = Mathf.getValidRadius(borderRadius.rt, absHeight, absWidth);
//         const rb = Mathf.getValidRadius(borderRadius.rb, absHeight, absWidth);

        
//         ctx.beginPath();
//         ctx.moveTo(0, 0);
//         ctx.lineTo(width, 0);
//         ctx.lineTo(width, height);
//         ctx.lineTo(0, height);
        
//         // if (width >= 0 && height >= 0) {
//         //     ctx.moveTo(lt, 0);
//         //     ctx.lineTo(absWidth - rt, 0); 
//         //     ctx.arcTo(absWidth, 0, absWidth, rt, rt);
            
//         //     ctx.lineTo(absWidth, absHeight - rb); 
//         //     ctx.arcTo(absWidth, absHeight, absWidth - rb, absHeight, rb);
            
//         //     ctx.lineTo(lb, absHeight);
//         //     ctx.arcTo(0, absHeight, 0, absHeight - lb, lb); 
            
//         //     ctx.lineTo(0, lt);
//         //     ctx.arcTo(0, 0, lt, 0, lt);
//         // } else if (width < 0 && height >= 0) {
//         //     ctx.moveTo(-lt, 0);
//         //     ctx.lineTo(-absWidth + rt, 0);
//         //     ctx.arcTo(-absWidth, 0, -absWidth, rt, rt);
            
//         //     ctx.lineTo(-absWidth, absHeight - rb);
//         //     ctx.arcTo(-absWidth, absHeight, -absWidth + rb, absHeight, rb);
            
//         //     ctx.lineTo(-lb, absHeight);
//         //     ctx.arcTo(0, absHeight, 0, absHeight - lb, lb);
            
//         //     ctx.lineTo(0, lt);
//         //     ctx.arcTo(0, 0, -lt, 0, lt);
//         // } else if (width >= 0 && height < 0) {
//         //     ctx.moveTo(lt, 0);
//         //     ctx.lineTo(absWidth - rt, 0);
//         //     ctx.arcTo(absWidth, 0, absWidth, -rt, rt);
            
//         //     ctx.lineTo(absWidth, -absHeight + rb);
//         //     ctx.arcTo(absWidth, -absHeight, absWidth - rb, -absHeight, rb);
            
//         //     ctx.lineTo(lb, -absHeight);
//         //     ctx.arcTo(0, -absHeight, 0, -absHeight + lb, lb);
            
//         //     ctx.lineTo(0, -lt);
//         //     ctx.arcTo(0, 0, lt, 0, lt);
//         // } else {
//         //     ctx.moveTo(-lt, 0);
//         //     ctx.lineTo(-absWidth + rt, 0);
//         //     ctx.arcTo(-absWidth, 0, -absWidth, -rt, rt);
            
//         //     ctx.lineTo(-absWidth, -absHeight + rb);
//         //     ctx.arcTo(-absWidth, -absHeight, -absWidth + rb, -absHeight, rb);
            
//         //     ctx.lineTo(-lb, -absHeight);
//         //     ctx.arcTo(0, -absHeight, 0, -absHeight + lb, lb);
            
//         //     ctx.lineTo(0, -lt);
//         //     ctx.arcTo(0, 0, -lt, 0, lt);
//         // }
        
//         // ctx.closePath();
//         // ctx.fillStyle = fillColor;
//         ctx.strokeStyle = "white";
//         ctx.fill();
//     }

//     public static drawVertices(context: CanvasRenderingContext2D, vertices: Vertice[], fillColor: string = "white") {
//         // Verifica se o array de vértices possui pelo menos um vértice
//         if (vertices.length < 3) {
//             console.error("O array de vértices deve ser maior que 3.");
//             return;
//         }
    
//         context.beginPath();
     
//         for (let index = 1; index <= vertices.length; index++) {
//             const currentElement = vertices[index % vertices.length];
//             const nextElement = vertices[(index + 1) % vertices.length]; 
    
//             if (!currentElement.arc) {
//                 context.lineTo(currentElement.x, currentElement.y);
//             } else {
//                 context.arcTo(
//                     currentElement.x, currentElement.y,
//                     nextElement.x, nextElement.y,
//                     20
//                 );
//             }
//         }
    
//         context.closePath();
//         context.fillStyle = fillColor; 
//         context.strokeStyle = "red"
//         context.fill();              
//         context.stroke();         
//     }

//     public static drawPath(context: CanvasRenderingContext2D, path: Path2D, fillColor: string = "white", strokeColor: string = "black") {
//         context.fillStyle = fillColor;
//         context.fill(path);
//     }
    
//     public static drawImage(
//         context: CanvasRenderingContext2D,
//         image: HTMLImageElement,
//         width: number,
//         height: number,
//         adjust: "fit" | "fill" | "stretch" | "center" | "repeat" = "stretch"
//     ): void {
//         // Verificar se a imagem está carregada
//         if (!image.complete) {
//             // Adicionar um listener para o evento onload da imagem
//             image.onload = () => {
//                 this.drawImageInternal(context, image, width, height, adjust);
//             };
    
//             // Adicionar um listener para o evento onerror para lidar com falhas de carregamento
//             image.onerror = () => {
//                 console.error("Falha ao carregar a imagem.");
//             };
    
//             return;
//         }
    
//         // Se a imagem já estiver carregada, desenhar diretamente
//         this.drawImageInternal(context, image, width, height, adjust);
//     }
    
//     private static drawImageInternal(
//         context: CanvasRenderingContext2D,
//         image: HTMLImageElement,
//         width: number,
//         height: number,
//         adjust: "fit" | "fill" | "stretch" | "center" | "repeat"
//     ): void {

//         context.save();
//         const cacheKey = `${image.src}-${width}-${height}-${adjust}`;
//         let cachedCanvas = EngineCache.getImageCache(cacheKey);
    
//         if (!cachedCanvas) {
//             cachedCanvas = document.createElement('canvas');
//             const ctx = cachedCanvas.getContext('2d');
//             if (!ctx) {
//                 console.error("Não foi possível obter o contexto 2D do canvas.");
//                 return;
//             }
//             cachedCanvas.width = width;
//             cachedCanvas.height = height;
    
//             let drawWidth = width;
//             let drawHeight = height;
    
//             switch (adjust) {
//                 case "fit":
//                     const fitScale = Math.min(width / image.width, height / image.height);
//                     drawWidth = image.width * fitScale;
//                     drawHeight = image.height * fitScale;
//                     break;
//                 case "fill":
//                     const fillScale = Math.max(width / image.width, height / image.height);
//                     drawWidth = image.width * fillScale;
//                     drawHeight = image.height * fillScale;
//                     break;
//                 case "stretch":
//                     drawWidth = width;
//                     drawHeight = height;
//                     break;
//                 case "center":
//                     drawWidth = image.width;
//                     drawHeight = image.height;
//                     break;
//                 case "repeat":
                    
//                     break;
//             }
    
//             ctx.clearRect(0, 0, cachedCanvas.width, cachedCanvas.height);
//             ctx.drawImage(image, 0, 0, drawWidth, drawHeight);
//             EngineCache.setImageCache(cacheKey, cachedCanvas);
//         }
    
//         context.drawImage(cachedCanvas, 0, 0, width, height);
//         context.restore();
//     }

//     public static roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, rotation:number = 0) {
//     }
// }

// export interface TextStyle {
//     color?: string;
//     font?: string;
//     fontSize?: number;
//     fontStyle?: string;
//     decoration?: string;
// }

// export class TextDrawer {
//     private static yPosition: number = 0;
//     private static textHeight: number = 16;
//     private static lineHeight: number = 16;
//     private static defaultColor: string = "white";
//     private static defaultFont: string = "Arial";
//     private static defaultFontSize: number = 16;
//     private static defaultFontStyle: string = "normal";
//     private static defaultDecoration: string = "none";

   
//     public static drawText(text: string) {
//         const context = EngineCache.getContext();

//         // Dividir o texto em linhas
//         const lines = text.split('\n').map(line => line.trim());

//         context.save();

//         for (const line of lines) {
//             const parts = this.parseTextWithTags(line);

//             let currentX = 0; // Resetar posição horizontal para cada linha

//             for (const part of parts) {
//                 context.font = `${part.fontStyle || this.defaultFontStyle} ${part.fontSize || this.defaultFontSize}px ${part.font || this.defaultFont}`;
//                 context.fillStyle = part.color || this.defaultColor;

//                 // Desenhar o texto
//                 context.fillText(part.text, currentX, this.yPosition + this.textHeight);

//                 // Aplicar decoração se necessário
//                 if (part.decoration === 'underline') {
//                     context.beginPath();
//                     context.moveTo(currentX, this.yPosition + this.textHeight + 2);
//                     context.lineTo(currentX + context.measureText(part.text).width, this.yPosition + this.textHeight + 2);
//                     context.strokeStyle = context.fillStyle;
//                     context.stroke();
//                 }

//                 // Atualizar a posição horizontal
//                 currentX += context.measureText(part.text).width;
//             }

//             this.yPosition += this.lineHeight; // Mover para a próxima linha
//         }

//         context.restore();
//     }

//     public static resetPosition() {
//         this.yPosition = 0;
//     }

//     private static parseTextWithTags(text: string) {
//         const parts: { text: string, color?: string, font?: string, fontSize?: number, fontStyle?: string, decoration?: string }[] = [];
//         const regex = /<style>\{([^}]*)\}<\/style>/g;
//         let match;
//         let lastIndex = 0;
//         let currentStyle: TextStyle = {};

//         while ((match = regex.exec(text)) !== null) {
//             if (match.index > lastIndex) {
//                 parts.push({ text: text.substring(lastIndex, match.index), ...currentStyle });
//             }

//             const styleString = match[1];
//             const styleProperties = this.parseStyleString(styleString);

//             currentStyle = { ...currentStyle, ...styleProperties };
//             lastIndex = regex.lastIndex;
//         }

//         if (lastIndex < text.length) {
//             parts.push({ text: text.substring(lastIndex), ...currentStyle });
//         }

//         return parts;
//     }

//     private static parseStyleString(styleString: string): TextStyle {
//         const style: TextStyle = {};
//         const properties = styleString.split(',').map(prop => prop.trim());
        
//         for (const property of properties) {
//             const [key, value] = property.split(':').map(part => part.trim());
//             switch (key) {
//                 case 'color':
//                     style.color = value;
//                     break;
//                 case 'font':
//                     style.font = value.replace(/"/g, '');
//                     break;
//                 case 'fontSize':
//                     style.fontSize = parseInt(value, 10);
//                     break;
//                 case 'fontStyle':
//                     style.fontStyle = value;
//                     break;
//                 case 'decoration':
//                     style.decoration = value;
//                     break;
//             }
//         }

//         return style;
//     }

    
// }
