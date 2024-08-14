import Color from "../../static/color";
import Shader from "./Shader";

export default class Material {
    public color: Color = Color.white;
    public shader: Shader = new Shader();
}