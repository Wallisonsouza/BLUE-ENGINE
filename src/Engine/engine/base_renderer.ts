import Camera from "../components/Camera";
import Component from "./base_component";

export default class Renderer extends Component {
    public fillColor: string = "rgba(255,255, 255, 0.5)";
    public strokeColor: string = "rgba(0, 0, 0, 1)";
    public lineWidth: number = 0;
  
   public render(context: CanvasRenderingContext2D): void{}
}