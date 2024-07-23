import Vector2 from "../../vector2";
import { KeyCode } from "../enum/KeyCode";
import Mathf from "./Mathf";
import Time from "./Time";

export default class Input {
    public static initialize(): void {
        MouseInput.initialize();
        KeyInput.initialize();
    }

    public static update(): void {
        MouseInput.update();
        KeyInput.update();
    }

    public static getKeyDown(key: KeyCode): boolean {
        return KeyInput.getKeyDown(key);
    }

    public static getKey(key: KeyCode): boolean {
        return KeyInput.getKey(key);
    }

    public static getKeyUp(key: KeyCode): boolean {
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

    public static getMousePosition(): Vector2 {
        return MouseInput.getMousePosition();
    }

    public static getMouseMovement(): Vector2 {
        return MouseInput.getMouseMovement();
    }

    public static getAxis(axis: string): number {
        return AxisInput.getAxis(axis);
    }
}

class MouseInput {
    private static readonly mouseButtonState = new Map<number, boolean>();
    private static readonly mouseButtonDown = new Map<number, boolean>();
    private static readonly mouseButtonUp = new Map<number, boolean>();

    private static _mousePosition = Vector2.zero;
    private static _mouseMovement = Vector2.zero;

    public static initialize(): void {
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    public static update(): void {
        this.mouseButtonDown.clear();
        this.mouseButtonUp.clear();
        this._mouseMovement = Vector2.zero;
    }

    public static getMouseButtonDown(button: number): boolean {
        return this.getButtonState(this.mouseButtonDown, button);
    }

    public static getMouseButton(button: number): boolean {
        return this.mouseButtonState.get(button) ?? false;
    }

    public static getMouseButtonUp(button: number): boolean {
        return this.getButtonState(this.mouseButtonUp, button);
    }

    public static getMousePosition(): Vector2 {
        return this._mousePosition;
    }

    public static getMouseMovement(): Vector2 {
        return this._mouseMovement;
    }

    private static getButtonState(map: Map<number, boolean>, button: number): boolean {
        const state = map.get(button) ?? false;
        map.delete(button);
        return state;
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
        this._mouseMovement = new Vector2(e.movementX, e.movementY);
        this._mousePosition = new Vector2(e.clientX, e.clientY);
    }
}

class KeyInput {
    private static readonly keyState = new Map<string, boolean>();
    private static readonly keyDown = new Map<string, boolean>();
    private static readonly keyUp = new Map<string, boolean>();

    public static initialize(): void {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    public static update(): void {
        this.keyDown.clear();
        this.keyUp.clear();
    }

    public static getKeyDown(key: string): boolean {
        return this.getButtonState(this.keyDown, key);
    }

    public static getKey(key: string): boolean {
        return this.keyState.get(key) ?? false;
    }

    public static getKeyUp(key: string): boolean {
        return this.getButtonState(this.keyUp, key);
    }

    private static getButtonState(map: Map<string, boolean>, key: string): boolean {
        const state = map.get(key) ?? false;
        map.delete(key);
        return state;
    }

    private static handleKeyDown(e: KeyboardEvent): void {
        this.keyState.set(e.key, true);
        this.keyDown.set(e.key, true);
    }

    private static handleKeyUp(e: KeyboardEvent): void {
        this.keyState.set(e.key, false);
        this.keyUp.set(e.key, true);
    }
}

class AxisInput {

     // Configuração de interpolação para cada tecla
     private static keySettings: { [key: string]: { value: number; duration: number } } = {
        "d": { value: 0, duration: 1 },
        "a": { value: 0, duration: 1 },
        "w": { value: 0, duration: 1 },
        "s": { value: 0, duration: 1 }
    };

    // Função auxiliar para interpolação
    private static interpolateKey(key: string, targetValue: number, deltaTime: number): void {
        if (KeyInput.getKey(key)) {
            this.keySettings[key].value = Mathf.lerp(
                this.keySettings[key].value,
                targetValue,
                deltaTime / this.keySettings[key].duration
            );
        } else {
            this.keySettings[key].value = Mathf.lerp(
                this.keySettings[key].value,
                0,
                deltaTime / this.keySettings[key].duration
            );
        }
    }

    // Função principal para obter o eixo
    public static getAxis(axis: string) {
        const deltaTime = Time.getDeltaTime();

        if (axis === "Horizontal") {
            this.interpolateKey("d", 1, deltaTime);
            this.interpolateKey("a", 1, deltaTime); 
            return this.keySettings["d"].value - this.keySettings["a"].value;
        } 
        
        if (axis === "Vertical") {
            this.interpolateKey("s", 1, deltaTime);
            this.interpolateKey("w", 1, deltaTime);
            return this.keySettings["s"].value - this.keySettings["w"].value;
        }

        return 0;
    }
}