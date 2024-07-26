// import BaseWindow from "../engine/window/base_window";

// /**
//  * Esta classe é responsável por gerenciar as janelas que podem ser renderizadas pela engine.
//  * 
//  * A engine pode renderizar várias janelas, por exemplo, uma janela para o jogo e outra para o editor.
//  * 
//  * Atualmente a egine suporta dois tipos de janelas: janela do jogo e janela do editor.
//  * 
//  * A janela do jogo é a janela onde o jogo é renderizado.
//  * 
//  * A janela do editor é a janela onde o editor é renderizado.
//  */

// export default class WindowManager {

//     private static context2d: CanvasRenderingContext2D[] = [];
    

//     public static addWindow(newWindow: BaseWindow): void {
//         this.context2d.push(newWindow.context);
//     }

//     public static getRenderableWindow(): CanvasRenderingContext2D{
//         return this.context2d[0];
//     }
    
//     /**
//      * 
//      * @returns Esta função retorna todas as janelas que podem ser renderizadas
//      */
//     public static getRenderableWindows(): CanvasRenderingContext2D[] {
//         return this.context2d;
//     }
    
//     /**
//      * Retorna todas as janelas onde o jogo pode ser renderizado
//      */
//     public getAllGameWindows() {
//         throw new Error("Method not implemented.");
       
//     }

//     /**
//      * Retorna a janela onde o jogo pode ser renderizado
//      */
//     public getGameWindow() {
//         throw new Error("Method not implemented.");
//     }

//     public getAllEditorWindows() {
//         throw new Error("Method not implemented.");
//     }

//     /**
//      * Retorna a janela
//      */
//     public getEditorWindow() {
//         throw new Error("Method not implemented.");
//     }

//     public static clearWindows(){
//         this.context2d.forEach(context => {
//             context.clearRect(0, 0, window.innerWidth, window.innerHeight);

//         });
//     }


// }
