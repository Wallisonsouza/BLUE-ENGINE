import Vector2 from "../../vector2";
import VisualLine from "./LineContainer";
import "./TransformStyle.css";
import VisualComponent from "./VisualComponent";

export default class VisualTransform extends VisualComponent {

    private _inpuPositionX: HTMLInputElement = document.createElement('input');
    private _inpuPositionY: HTMLInputElement = document.createElement('input');
    private _inpuRotation: HTMLInputElement = document.createElement('input');
    private _inpuScaleX: HTMLInputElement = document.createElement('input');
    private _inpuScaleY: HTMLInputElement = document.createElement('input');

    private _linePositon: VisualLine;
    private _lineRotation: VisualLine;
    private _lineScale: VisualLine;

    private _xText: HTMLSpanElement = document.createElement('span');
    private _yText: HTMLSpanElement = document.createElement('span');

    private wText: HTMLSpanElement = document.createElement('span');
    private hText: HTMLSpanElement = document.createElement('span');
    private rText: HTMLSpanElement = document.createElement('span');

    private _positionText: HTMLSpanElement = document.createElement('span');
    private _rotationText: HTMLSpanElement = document.createElement('span');
    private _scaleText: HTMLSpanElement = document.createElement('span');

    constructor() {
        super();
        this.optionsBar.name = 'Transform';
        this._linePositon = new VisualLine();
        this._lineRotation = new VisualLine();
        this._lineScale = new VisualLine();


        this._inpuPositionX.type = 'number';
        this._inpuPositionX.value = '0';
        this._inpuPositionY.type = 'number';
        this._inpuPositionY.value = '0';
        this._inpuRotation.type = 'number';
        this._inpuRotation.value = '0';
        this._inpuScaleX.type = 'number';
        this._inpuScaleX.value = '1';
        this._inpuScaleY.type = 'number';
        this._inpuScaleY.value = '1';



        this._xText.className = 'text';
        this._yText.className = 'text';
        this.wText.className = 'text';
        this.hText.className = 'text';
        this.rText.className = 'text';

        this._positionText.className = 'subTitle';
        this._rotationText.className = 'subTitle';
        this._scaleText.className = 'subTitle';

        this._positionText.innerText = 'Position:';
        this._xText.innerText = 'X';
        this._yText.innerText = 'Y';

        this._rotationText.innerText = 'Rotation:';
        this._scaleText.innerText = 'Dimension:';
        this.wText.innerText = 'W';
        this.hText.innerText = 'H';

        this.rText.innerText = 'R';

        this._linePositon.start.appendChild(this._positionText);
        this._linePositon.end.appendChild(this._xText);
        this._linePositon.end.appendChild(this._inpuPositionX);
        this._linePositon.end.appendChild(this._yText);
        this._linePositon.end.appendChild(this._inpuPositionY);

        this._lineRotation.start.appendChild(this._rotationText);
        this._lineRotation.end.appendChild(this.rText);
        this._lineRotation.end.appendChild(this._inpuRotation);
        
        this._lineScale.start.appendChild(this._scaleText);
        this._lineScale.end.appendChild(this.wText);
        this._lineScale.end.appendChild(this._inpuScaleX);
        this._lineScale.end.appendChild(this.hText);
        this._lineScale.end.appendChild(this._inpuScaleY);

        this.content.appendChild(this._linePositon);
        this.content.appendChild(this._lineScale);
        this.content.appendChild(this._lineRotation);
    }

    public setPosition(position: Vector2) {
        this._inpuPositionX.valueAsNumber = position.x;
        this._inpuPositionY.valueAsNumber = position.y;
    }
    public getPosition(): Vector2 {
        return new Vector2(
            this._inpuPositionX.valueAsNumber, 
            this._inpuPositionY.valueAsNumber
        );
    }

    public setRotation(rotation: number) {
        this._inpuRotation.valueAsNumber = rotation;
    }
    public getRotation(): number {
        return this._inpuRotation.valueAsNumber;
    }

    public setSize(scale: Vector2) {
        this._inpuScaleX.valueAsNumber = scale.x;
        this._inpuScaleY.valueAsNumber = scale.y;
    }
    public getScale(): Vector2 {
        return new Vector2(
            this._inpuScaleX.valueAsNumber, 
            this._inpuScaleY.valueAsNumber
        );
    }
}


customElements.define('visual-transform', VisualTransform);