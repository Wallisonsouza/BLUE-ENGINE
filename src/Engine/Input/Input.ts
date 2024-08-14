import KeyInput from "./KeyInput";
import { EKey } from "./EKey";
import MouseInput from "./MouseInput";

export default class Input {
    public static start(): void {
        KeyInput.initialize();
    }

    public static update(): void {
        KeyInput.update();
    }

    public static getMousePosition(): { x: number, y: number } {
        return MouseInput.getPosition();
    }

    public static getMouseMovement(): { x: number, y: number } {
        return MouseInput.getMovement();
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

    // public static getClickHold(
    //     element: HTMLElement,
    //     clickHoldThreshold: number = 500,
    //     onClick?: (event: MouseEvent) => void,
    //     onClickAndHold?: (event: MouseEvent) => void
    // ): void

    // {
    //     MouseInput.getClickHold(element, clickHoldThreshold, onClick, onClickAndHold);
    // }
}

