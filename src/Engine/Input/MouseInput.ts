export default class MouseInput {
    private static readonly buttonState = new Map<number, boolean>();
    private static readonly buttonDown = new Map<number, boolean>();
    private static readonly buttonUp = new Map<number, boolean>();
    private static position: { x: number, y: number } = { x: 0, y: 0 };
    private static movement: { x: number, y: number } = { x: 0, y: 0 };
    private static scrollDelta: { x: number, y: number } = { x: 0, y: 0 };
    private static scrollCallback: ((delta: { x: number, y: number }) => void) | null = null;

    public static initialize(): void {
        document.addEventListener('mousedown', this.handleButtonDown.bind(this));
        document.addEventListener('mouseup', this.handleButtonUp.bind(this));
        document.addEventListener('mousemove', (e) => {
            MouseInput.position = { x: e.clientX, y: e.clientY};
            MouseInput.movement = { x: e.movementX, y: e.movementY };
        });
        document.addEventListener('wheel', this.handleScroll.bind(this));
    }

    public static clear(): void {
        this.buttonDown.clear();
        this.buttonUp.clear();
        MouseInput.movement = { x: 0, y: 0 };
        MouseInput.scrollDelta = { x: 0, y: 0 };
    }

    public static getMouseButtonDown(button: number): boolean {
        return this.buttonDown.get(button) ?? false;
    }

    public static getMouseButton(button: number): boolean {
        return this.buttonState.get(button) ?? false;
    }

    public static getMouseButtonUp(button: number): boolean {
        return this.buttonUp.get(button) ?? false;
    }

    private static handleButtonDown(e: MouseEvent): void {
        if (!this.buttonState.get(e.button)) {
            this.buttonState.set(e.button, true);
            this.buttonDown.set(e.button, true);
        }
    }

    private static handleButtonUp(e: MouseEvent): void {
        this.buttonState.set(e.button, false);
        this.buttonUp.set(e.button, true);
    }

    private static handleScroll(e: WheelEvent): void {
        MouseInput.scrollDelta = { x: e.deltaX, y: e.deltaY };
        if (MouseInput.scrollCallback) {
            MouseInput.scrollCallback(MouseInput.scrollDelta);
        }
    }

    public static getPosition() {
        return MouseInput.position;
    }

    public static getMovement() {
        return MouseInput.movement;
    }

    public static getScrollDelta() {
        return MouseInput.scrollDelta;
    }

    public static onScroll(callback: (delta: { x: number, y: number }) => void): void {
        MouseInput.scrollCallback = callback;
    }
}
