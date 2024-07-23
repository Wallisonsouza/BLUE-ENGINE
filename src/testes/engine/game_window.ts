import "./game_window.css";
import BaseWindow from "./base_window";

export default class GameWindow extends BaseWindow {

    constructor() {
        
        super();

        const gameWindow = document.createElement('div');
        gameWindow.className = 'game-window';

        const topBar = document.createElement('div');
        topBar.className = 'top-bar';

        const startButton = document.createElement('div');
        startButton.className = 'start-button';
        const startButtonIcon = document.createElement('img');
        startButtonIcon.className = 'start-button-icon';
        startButtonIcon.src = Config.GAME_WINDOW.ICON_PLAY;
        startButton.appendChild(startButtonIcon);

        const stopButton = document.createElement('div');
        stopButton.className = 'stop-button';
        const stopButtonIcon = document.createElement('img');
        stopButtonIcon.className = 'stop-button-icon';
        stopButtonIcon.src = Config.GAME_WINDOW.ICON_STOP;
        stopButton.appendChild(stopButtonIcon);

        const pauseButton = document.createElement('div');
        pauseButton.className = 'pause-button';
        const pauseButtonIcon = document.createElement('img');
        pauseButtonIcon.className = 'pause-button-icon';
        pauseButtonIcon.src = Config.GAME_WINDOW.ICON_PAUSE
        pauseButton.appendChild(pauseButtonIcon);



        topBar.appendChild(startButton);
        topBar.appendChild(pauseButton);
        topBar.appendChild(stopButton);

       

        gameWindow.appendChild(topBar);
        gameWindow.appendChild(this.canvas);
        document.body.appendChild(gameWindow);


       
    }
}

export class Config {

    public static iconColor: string = 'ffffff';
    public static iconSize: number = 18;
    public static readonly GAME_WINDOW = {
        
        ICON_PLAY: `https://img.icons8.com/?size=${this.iconSize}&id=9978&format=png&color=${this.iconColor}`,
        ICON_PAUSE: `https://img.icons8.com/?size=${this.iconSize}&id=9987&format=png&color=${this.iconColor}`,
        ICON_STOP: `https://img.icons8.com/?size=${this.iconSize}&id=9984&format=png&color=${this.iconColor}`
       
    }
}