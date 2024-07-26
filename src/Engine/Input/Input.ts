import MouseInput from "./MouseInput";
import KeyInput from "./KeyInput";
import { EKey } from "./EKey";

export default class Input {
    public static initialize(): void {
        MouseInput.initialize();
        KeyInput.initialize();
    }

    public static update(): void {
        MouseInput.update();
        KeyInput.update();
    }

    public static getKeyDown(key: EKey): boolean {
        return KeyInput.getKeyDown(key);
    }

    public static getKey(key: EKey): boolean {
        return KeyInput.getKey(key);
    }

    public static getKeyUp(key: EKey): boolean {
        return KeyInput.getKeyUp(key);
    }

    public static getMouseButtonDown(button: number): boolean {
        return MouseInput.getMouseButtonDown(button);
    }

    public static getMouseButton(button: number): boolean {
        return MouseInput.getMouseButton(button);
    }

    public static getMouseButtonUp(button: number): boolean {
        return MouseInput.getMouseButtonUp(button);
    }

    public static get mouseDelta() {
        return MouseInput.getMouseMovement();
    }

    public static get mousePosition(){
        return MouseInput.getMousePosition();
    }

    public static onMouseMove(callback: (event: MouseEvent) => void) {
        MouseInput.onMouseMove(callback);
    }

    public static onMouseDown(callback: (event: MouseEvent) => void) {
        MouseInput.onMouseDown(callback);
    }

    public static onMouseUp(callback: (event: MouseEvent) => void) {
        MouseInput.onMouseUp(callback);
    }

    public static getClickHold(
        element: HTMLElement,
        clickHoldThreshold: number = 500,
        onClick?: (event: MouseEvent) => void,
        onClickAndHold?: (event: MouseEvent) => void
    ): void

    {
        MouseInput.getClickHold(element, clickHoldThreshold, onClick, onClickAndHold);
    }
}

