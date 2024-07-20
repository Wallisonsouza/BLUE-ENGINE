export default class GizmosPosition {

    public element: HTMLElement;

    constructor() {

        this.element = document.createElement("div");
        this.element.className = "gizmo-position";

        const xArrow = document.createElement("div");
        xArrow.className = "arrow-x";
        const yArrow = document.createElement("div");
        yArrow.className = "arrow-y";

        const xLine = document.createElement("div");
        xLine.className = "line-x";
        const yLine = document.createElement("div");
        yLine.className = "line-y";


        this.element.appendChild(xArrow);
        this.element.appendChild(yArrow);
        this.element.appendChild(xLine);
        this.element.appendChild(yLine);
    }
}