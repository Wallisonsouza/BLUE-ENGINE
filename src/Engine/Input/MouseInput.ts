type MousePosition = { x: number, y: number };
type MouseEventCallback = (event: MouseEvent) => void;

export default class MouseInput {

    private static readonly mouseButtonState = new Map<number, boolean>();
    private static readonly mouseButtonDown = new Map<number, boolean>();
    private static readonly mouseButtonUp = new Map<number, boolean>();

    private static _mousePosition: MousePosition = { x: 0, y: 0 };
    private static _mouseMovement: MousePosition = { x: 0, y: 0 };

    public static initialize(): void {
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    public static update(): void {
        this.mouseButtonDown.clear();
        this.mouseButtonUp.clear();
        this._mouseMovement = { x: 0, y: 0 };
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

    public static getMousePosition(): MousePosition {
        return this._mousePosition;
    }

    public static getMouseMovement(): MousePosition {
        return this._mouseMovement;
    }


    private static getButtonState(map: Map<number, boolean>, button: number): boolean {
        const state = map.get(button) ?? false;
        map.delete(button);
        return state;
    }

    private static handleMouseDown(event: MouseEvent): void {
        this.mouseButtonState.set(event.button, true);
        this.mouseButtonDown.set(event.button, true);
    }

    private static handleMouseUp(event: MouseEvent): void {
        this.mouseButtonState.set(event.button, false);
        this.mouseButtonUp.set(event.button, true);
    }

    private static handleMouseMove(event: MouseEvent): void {
        this._mouseMovement = { x: event.movementX, y: event.movementY };
        this._mousePosition = { x: event.clientX, y: event.clientY };
    }

    private static createEventListener(callback: MouseEventCallback) {
        return (event: MouseEvent) => {
            callback(event);
        };
    }
    public static onMouseMove(callback: MouseEventCallback): void {
        window.addEventListener("mousemove", this.createEventListener(callback));
    }

    public static onMouseDown(callback: MouseEventCallback): void {
        window.addEventListener("mousedown", this.createEventListener(callback));
    }

    public static onMouseUp(callback: MouseEventCallback): void {
        window.addEventListener("mouseup", this.createEventListener(callback));
    }

    public static getClickHold(
        element: HTMLElement,
        clickHoldThreshold: number = 500,
        onClick?: (event: MouseEvent) => void,
        onClickAndHold?: (event: MouseEvent) => void
    ): void {
        let mouseDownTime: number | null = null;
        let holdTimeout: number | null = null;

        const clearHoldTimeout = () => {
            if (holdTimeout !== null) {
                clearTimeout(holdTimeout);
                holdTimeout = null;
            }
        };

        const handleMouseDown = (event: MouseEvent) => {
            event.stopPropagation();
            mouseDownTime = Date.now();

            if (onClickAndHold) {
                holdTimeout = window.setTimeout(() => {
                    onClickAndHold(event);
                    clearHoldTimeout();
                }, clickHoldThreshold);
            }
        };

        const handleMouseUp = (event: MouseEvent) => {
            if (mouseDownTime === null) return;

            const mouseUpTime = Date.now();
            const timeHeld = mouseUpTime - mouseDownTime;
            mouseDownTime = null;

            clearHoldTimeout();

            if (timeHeld < clickHoldThreshold && onClick) {
                onClick(event);
            }
        };

        const handleMouseLeave = () => {
            clearHoldTimeout();
        };

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('mouseleave', handleMouseLeave);
    }
}
