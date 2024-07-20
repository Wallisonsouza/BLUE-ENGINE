import Vector2 from "../../vector2";
import VisualLine from "./LineContainer";
import VisualComponent from "./VisualComponent";

export default class VisualCollider extends VisualComponent {

    private _lineOffset: VisualLine = new VisualLine();
    private _offsetX: HTMLInputElement = document.createElement('input');
    private _offsetY: HTMLInputElement = document.createElement('input');
    private _xText: HTMLSpanElement = document.createElement('span');
    private _yText: HTMLSpanElement = document.createElement('span');


    private _lineSize: VisualLine = new VisualLine();
    private _sizeX: HTMLInputElement = document.createElement('input');
    private _sizeY: HTMLInputElement = document.createElement('input');
    private _xSizeText: HTMLSpanElement = document.createElement('span');
    private _ySizeText: HTMLSpanElement = document.createElement('span');

    
    private offsetText: HTMLSpanElement = document.createElement('span');
    private sizeText: HTMLSpanElement = document.createElement('span');

    constructor() {
        super();
        this.optionsBar.name = 'Box Collider';
        this._offsetX.type = 'number';
        this._offsetX.value = '0';

        this._offsetY.type = 'number';
        this._offsetY.value = '0';


        this._xText.className = 'text';
        this._yText.className = 'text';

        this._xText.innerText = 'X';
        this._yText.innerText = 'Y';

        this.offsetText.className = 'subTitle';
        this.offsetText.innerText = 'Offset';

        this._lineOffset.start.appendChild(this.offsetText);
        this._lineOffset.end.appendChild(this._xText);
        this._lineOffset.end.appendChild(this._offsetX);
        this._lineOffset.end.appendChild(this._yText);
        this._lineOffset.end.appendChild(this._offsetY);

        this._sizeX.type = 'number';
        this._sizeX.value = '1';

        this._sizeY.type = 'number';
        this._sizeY.value = '1';

        this._xText.innerText = 'X';
        this._yText.innerText = 'Y';

        
        this.content.appendChild(this._lineOffset);
        
        this.sizeText.className = 'subTitle';
        this.sizeText.innerText = 'Size';

        this._xSizeText.className = 'text';
        this._ySizeText.className = 'text';

        this._xSizeText.innerText = 'X';
        this._ySizeText.innerText = 'Y';

        this._lineSize.start.appendChild(this.sizeText);
        this._lineSize.end.appendChild(this._xSizeText);
        this._lineSize.end.appendChild(this._sizeX);
        this._lineSize.end.appendChild(this._ySizeText);
        this._lineSize.end.appendChild(this._sizeY);

        this.content.appendChild(this._lineSize);

        
    }

    public setOffset(offset: Vector2): void {
        this._offsetX.value = offset.x.toString();
        this._offsetY.value = offset.y.toString();
    }

    public setSize(size: Vector2): void {
        this._sizeX.value = size.x.toString();
        this._sizeY.value = size.y.toString();
    }

    public getOffset(): Vector2 {
        return new Vector2(this._offsetX.valueAsNumber, this._offsetY.valueAsNumber);
    }

    public getSize(): Vector2 {
        return new Vector2(this._sizeX.valueAsNumber, this._sizeY.valueAsNumber);
    }
}

customElements.define('visual-collider', VisualCollider);