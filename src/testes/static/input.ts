import Vector2 from "../../vector2";

export default class Input {
 
    private static _mousePosition: Vector2 = Vector2.zero;
    private static _mouseMovement: Vector2 = Vector2.zero;
    private static mouseButtonState: Map<number, boolean> = new Map();
    private static mouseButtonDown: Map<number, boolean> = new Map();
    private static mouseButtonUp: Map<number, boolean> = new Map();
    private static keyState: Map<string, boolean> = new Map();
    private static keyDown: Map<string, boolean> = new Map();
    private static keyUp: Map<string, boolean> = new Map();
    private static mouseMoveTimeout: number | null = null;

    //#region  GETTERS
        public static get mousePosition(): Vector2 {
            return this._mousePosition;
        }

        public static get mouseMovement(): Vector2 {
            return this._mouseMovement;
        }
    //#endregion

    //#region  MOUSE
        public static getMouseButtonDown(button: number): boolean {
            return this.getButtonState(this.mouseButtonDown, button);
        }

        public static getMouseButton(button: number): boolean {
            return !!this.mouseButtonState.get(button);
        }

        public static getMouseButtonUp(button: number): boolean {
            return this.getButtonState(this.mouseButtonUp, button);
        }

        private static getButtonState(map: Map<number, boolean>, button: number): boolean {
            const wasDown = map.get(button);
            if (wasDown) {
                map.set(button, false);
                return true;
            }
            return false;
        }
    //#endregion

    //#region KEY
        public static getKeyDown(key: string): boolean {
            return this.getKeyState(this.keyDown, key);
        }

        public static getKey(key: string): boolean {
            return !!this.keyState.get(key);
        }

        public static getKeyUp(key: string): boolean {
            return this.getKeyState(this.keyUp, key);
        }

        private static getKeyState(map: Map<string, boolean>, key: string): boolean {
            const wasDown = map.get(key);
            if (wasDown) {
                map.set(key, false);
                return true;
            }
            return false;
        }
    //#endregion

    // Initialize event listeners
    public static init(): void {
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    private static handleMouseDown(e: MouseEvent): void {
        this.mouseButtonState.set(e.button, true);
        this.mouseButtonDown.set(e.button, true);
    }

    private static handleMouseUp(e: MouseEvent): void {
        this.mouseButtonState.set(e.button, false);
        this.mouseButtonUp.set(e.button, true);
    }

    private static handleMouseMove(e: MouseEvent): void {
        this._mousePosition = new Vector2(e.clientX, e.clientY);
        this._mouseMovement = new Vector2(e.movementX, e.movementY);

        if (this.mouseMoveTimeout !== null) {
            clearTimeout(this.mouseMoveTimeout);
        }

        this.mouseMoveTimeout = window.setTimeout(() => {
            this._mouseMovement = Vector2.zero;
        }, 100);
    }

    private static handleKeyDown(e: KeyboardEvent): void {
        const key = e.key;
        this.keyState.set(key, true);
        this.keyDown.set(key, true);
        this.keyUp.set(key, false);
    }

    private static handleKeyUp(e: KeyboardEvent): void {
        const key = e.key;
        this.keyState.set(key, false);
        this.keyDown.set(key, false);
        this.keyUp.set(key, true);
    }
}
