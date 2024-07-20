export default class VisualLine extends HTMLElement {

    public start: LineStart;
    public end: LineEnd;

    constructor() {

        super();
        this.start = new LineStart();
        this.end = new LineEnd();

        this.appendChild(this.start);
        this.appendChild(this.end);
    }
}

class LineStart extends HTMLElement {
    constructor() {
        super();
    }
}

class LineCenter extends HTMLElement {
    constructor() {
        super();
    }
}

class LineEnd extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('visual-line', VisualLine);
customElements.define('line-start', LineStart);
customElements.define('line-center', LineCenter);
customElements.define('line-end', LineEnd);