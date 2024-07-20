import "./VisualComponentStyle.css";

export default class VisualComponent extends HTMLElement {

    public content: Content = new Content();
    public optionsBar: OptionsBar = new OptionsBar();

    constructor() {
        super();
        this.appendChild(this.optionsBar);
        this.appendChild(this.content);

        this.optionsBar.arrow.addEventListener('click', () => {
            this.content.style.display = this.content.style.display == 'none' ? 'block' : 'none';
            this.content.style.display == 'none' ? this.optionsBar.arrow.innerText = '▶' : this.optionsBar.arrow.innerText = '▼';
        });
       
    }
}

class Content extends HTMLElement {
    constructor() {
        super();
    }
}

class OptionsBar extends HTMLElement {

    private _name: Name = new Name();
    public arrow: Arrow = new Arrow();
    constructor() {
        super();
        this.appendChild(this.arrow);
        this.appendChild(this._name);
    }

    public get name(): string {
        return this._name.innerText;
    }

    public set name(value: string) {
        this._name.innerText = value;
    }
}

class Name extends HTMLElement {

    
    constructor() {
        super();
        this.innerText = 'Name';
    }
}

class Arrow extends HTMLElement {
    constructor() {
        super();
        this.innerText = "▶";
    }
}

customElements.define('visual-component', VisualComponent);
customElements.define('component-content', Content);
customElements.define('component-options-bar', OptionsBar);
customElements.define('component-name', Name);
customElements.define('component-arrow', Arrow);

    

