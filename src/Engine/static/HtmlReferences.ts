import Rect from "../components/Rect";

export default class HtmlReferences {
    public static interface = {
        inspectorTitle: document.getElementById("inspector-title") as HTMLDivElement,
    }
    public static rect = {
        width: document.getElementById("width") as HTMLInputElement,
        height: document.getElementById("height") as HTMLInputElement,
        x: document.getElementById("x") as HTMLInputElement,
        y: document.getElementById("y") as HTMLInputElement,
        rotation: document.getElementById("rotation") as HTMLInputElement,
        index: document.getElementById("index") as HTMLInputElement,
    };

    private static handlers = {
        width: null as EventListener | null,
        height: null as EventListener | null,
        x: null as EventListener | null,
        y: null as EventListener | null,
        rotation: null as EventListener | null,
        index: null as EventListener | null,
    };

    public static getRectValues(rect: Rect): void {
        this.rect.width.value = rect.width.toString();
        this.rect.height.value = rect.height.toString();
        this.rect.x.value = rect.x.toString();
        this.rect.y.value = rect.y.toString();
        this.rect.rotation.value = rect.rotation.toString();
        this.rect.index.value = rect.index.toString();
    }

    public static setRectValues(rect: Rect) {
        this.clearRectEvents();

        this.handlers.x = (e: Event) => {
            const inputValue = Number(this.rect.x.value);
            if (!isNaN(inputValue)) {
                rect.x = inputValue;
            }
        };
        this.handlers.y = (e: Event) => {
            const inputValue = Number(this.rect.y.value);
            if (!isNaN(inputValue)) {
                rect.y = inputValue;
            }
        };

        this.handlers.width = (e: Event) => {
            const inputValue = Number(this.rect.width.value);
            if (!isNaN(inputValue)) {
                rect.width = inputValue;
            }
        };
        this.handlers.height = (e: Event) => {
            const inputValue = Number(this.rect.height.value);
            if (!isNaN(inputValue)) {
                rect.height = inputValue;
            }
        };

        this.handlers.rotation = (e: Event) => {
            const inputValue = Number(this.rect.rotation.value);
            if (!isNaN(inputValue)) {
                rect.rotation = inputValue;
            }
        };

        this.handlers.index = (e: Event) => {
            const inputValue = Number(this.rect.index.value);
            if (!isNaN(inputValue)) {
                rect.index = inputValue;
            }
        };

        this.rect.x.addEventListener('input', this.handlers.x);
        this.rect.y.addEventListener('input', this.handlers.y);
        this.rect.width.addEventListener('input', this.handlers.width);
        this.rect.height.addEventListener('input', this.handlers.height);
        this.rect.rotation.addEventListener('input', this.handlers.rotation);
        this.rect.index.addEventListener('input', this.handlers.index);

    }

    public static clearRectEvents() {

        if (this.handlers.x) {
            this.rect.x.removeEventListener('input', this.handlers.x);
            this.handlers.x = null;
        }
        if (this.handlers.y) {
            this.rect.y.removeEventListener('input', this.handlers.y);
            this.handlers.y = null;
        }

        if (this.handlers.width) {
            this.rect.width.removeEventListener('input', this.handlers.width);
            this.handlers.width = null;
        }
        if (this.handlers.height) {
            this.rect.height.removeEventListener('input', this.handlers.height);
            this.handlers.height = null;
        }

        if (this.handlers.rotation) {
            this.rect.rotation.removeEventListener('input', this.handlers.rotation);
            this.handlers.rotation = null;
        }

        if (this.handlers.index) {
            this.rect.index.removeEventListener('input', this.handlers.index);
            this.handlers.index = null;
        }
    }
}
