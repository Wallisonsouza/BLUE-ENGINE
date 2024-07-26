import Camera from "../components/Camera";
import Component from "./base_component";

export default class Renderer extends Component {
    public fillColor: string = "rgba(255,255, 255, 1)";
    public strokeColor: string = "rgba(0, 0, 0, 1)";
    public lineWidth: number = 0;
  
   public render(_ctx: CanvasRenderingContext2D, _camera: Camera): void{};
}