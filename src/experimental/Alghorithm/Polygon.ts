import Vector2 from "../../vector2";

export default class Polygon {

    public vertices: Vector2[] = [];

    public edges(): Vector2[] {
        const edges: Vector2[] = [];
        for (let i = 0; i < this.vertices.length; i++) {
            const nextIndex = (i + 1) % this.vertices.length;
            edges.push(this.vertices[nextIndex].subtract(this.vertices[i]));
        }
        return edges;
    }

    project(axis: Vector2): [number, number] {
        let min = axis.dot(this.vertices[0]);
        let max = min;
        for (const vertex of this.vertices) {
            const projection = axis.dot(vertex);
            if (projection < min) min = projection;
            if (projection > max) max = projection;
        }
        return [min, max];
    }

    public center(): Vector2 {
        return this.vertices.reduce((acc, vertex) => acc.add(vertex), Vector2.zero).divideScalar(this.vertices.length);
    }
}
