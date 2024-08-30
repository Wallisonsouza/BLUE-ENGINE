import GameObject from "../components/GameObject";
import MeshBuilder from "./MeshBuilder";
import MeshRenderer from "./MeshRenderer";

export default class GamerEntityBuilder {
    public static createSquare(): GameObject {

        const mesh = MeshBuilder.createSquare();
        const meshRenderer = new MeshRenderer();

        const square = new GameObject("new square");
        return square;
    }
}
