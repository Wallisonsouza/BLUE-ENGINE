import Rect from "../Engine/components/Rect";

export class VisualRect {
    private static elements = {
        rectForm: document.getElementById("rectForm") as HTMLFormElement,
        posX: document.getElementById("posX") as HTMLInputElement,
        posY: document.getElementById("posY") as HTMLInputElement,
        width: document.getElementById("width") as HTMLInputElement,
        height: document.getElementById("height") as HTMLInputElement,
        rotation: document.getElementById("rotation") as HTMLInputElement,
        borderTop: document.getElementById("borderTop") as HTMLInputElement,
        borderBottom: document.getElementById("borderBottom") as HTMLInputElement,
        borderLeft: document.getElementById("borderLeft") as HTMLInputElement,
        borderRight: document.getElementById("borderRight") as HTMLInputElement,
        originX: document.getElementById("originX") as HTMLInputElement,
        originY: document.getElementById("originY") as HTMLInputElement,
    };

    private static rect: Rect | null = null;

    private static parseInputValue(element: HTMLInputElement): number {
        return parseFloat(element.value) || 0;
    }

    private static updateRectX(value: number): void {
        if (this.rect) {
            this.rect.x = value;
        }
    }

    private static updateRectY(value: number): void {
        if (this.rect) {
            this.rect.y = value;
        }
    }

    private static updateRectWidth(value: number): void {
        if (this.rect) {
            this.rect.width = value;
        }
    }

    private static updateRectHeight(value: number): void {
        if (this.rect) {
            this.rect.height = value;
        }
    }

    private static updateRectRotation(value: number): void {
        if (this.rect) {
            this.rect.rotation = value;
        }
    }

    private static updateRectBorderTop(value: number): void {
        if (this.rect) {
            this.rect.borderRadius.lt = value;
        }
    }

    private static updateRectBorderBottom(value: number): void {
        if (this.rect) {
            this.rect.borderRadius.lb = value;
        }
    }

    private static updateRectBorderLeft(value: number): void {
        if (this.rect) {
            this.rect.borderRadius.rt = value;
        }
    }

    private static updateRectBorderRight(value: number): void {
        if (this.rect) {
            this.rect.borderRadius.rb = value;
        }
    }

    private static updateRectOriginX(value: number): void {
        if (this.rect) {
            this.rect.originX = value;
        }
    }

    private static updateRectOriginY(value: number): void {
        if (this.rect) {
            this.rect.originY = value;
        }
    }

    public static setupListeners(): void {
        this.elements.posX.addEventListener("input", () => {
            this.updateRectX(this.parseInputValue(this.elements.posX));
        });

        this.elements.posY.addEventListener("input", () => {
            this.updateRectY(this.parseInputValue(this.elements.posY));
        });

        this.elements.width.addEventListener("input", () => {
            this.updateRectWidth(this.parseInputValue(this.elements.width));
        });

        this.elements.height.addEventListener("input", () => {
            this.updateRectHeight(this.parseInputValue(this.elements.height));
        });

        this.elements.rotation.addEventListener("input", () => {
            this.updateRectRotation(this.parseInputValue(this.elements.rotation));
        });

        this.elements.borderTop.addEventListener("input", () => {
            this.updateRectBorderTop(this.parseInputValue(this.elements.borderTop));
        });

        this.elements.borderBottom.addEventListener("input", () => {
            this.updateRectBorderBottom(this.parseInputValue(this.elements.borderBottom));
        });

        this.elements.borderLeft.addEventListener("input", () => {
            this.updateRectBorderLeft(this.parseInputValue(this.elements.borderLeft));
        });

        this.elements.borderRight.addEventListener("input", () => {
            this.updateRectBorderRight(this.parseInputValue(this.elements.borderRight));
        });

        this.elements.originX.addEventListener("input", () => {
            this.updateRectOriginX(this.parseInputValue(this.elements.originX));
        });

        this.elements.originY.addEventListener("input", () => {
            this.updateRectOriginY(this.parseInputValue(this.elements.originY));
        });
    }

    public static updateValues(rect: Rect): void {
        if (rect) {
            this.elements.posX.value = rect.rotatedPosition.x.toString();
            this.elements.posY.value = rect.rotatedPosition.y.toString();
            this.elements.width.value = rect.width.toString();
            this.elements.height.value = rect.height.toString();
            this.elements.rotation.value = rect.rotation.toString();
            this.elements.borderTop.value = rect.borderRadius.lt.toString();
            this.elements.borderBottom.value = rect.borderRadius.lb.toString();
            this.elements.borderLeft.value = rect.borderRadius.rt.toString();
            this.elements.borderRight.value = rect.borderRadius.rb.toString();
            this.elements.originX.value = rect.originX.toString();
            this.elements.originY.value = rect.originY.toString();
        }
    }

    public static setRect(rect: Rect): void {
        this.rect = rect;
        this.updateValues(rect); // Atualiza os valores do formulário com o retângulo existente
        this.elements.rectForm.style.display = "block";
    }
}
