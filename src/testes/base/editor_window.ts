import BaseWindow from "./base_window";
import "./game_window.css";

export default class EditorWindow extends BaseWindow {

    constructor() {

        super();
        const gameWindow = document.createElement('div');
        gameWindow.className = 'game-window';
        gameWindow.appendChild(this.canvas);
        document.body.appendChild(gameWindow);
    }
}