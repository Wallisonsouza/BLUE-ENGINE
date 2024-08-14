import Vec3 from "../../graphycs/vec3";

/**
 * Representação de um vetor 3D.
 */
export interface IVector3 {
    /**
     * A coordenada X do vetor no espaço 3D.
     */
    x: number;

    /**
     * A coordenada Y do vetor no espaço 3D.
     */
    y: number;

    /**
     * A coordenada Z do vetor no espaço 3D.
     */
    z: number;

    /**
     * Soma o vetor atual com outro vetor componente a componente e retorna o vetor resultante.
     * @param vector O vetor a ser somado.
     * @returns Um novo vetor que é a soma do vetor atual e do vetor fornecido.
     */
    add(vector: Vec3): Vec3;

    /**
     * Subtrai outro vetor do vetor atual componente a componente e retorna o vetor resultante.
     * @param vector O vetor a ser subtraído.
     * @returns Um novo vetor que é a diferença entre o vetor atual e o vetor fornecido.
     */
    subtract(vector: Vec3): Vec3;

    /**
     * Divide o vetor atual pelo vetor fornecido componente a componente e retorna o vetor resultante.
     * @param vector O vetor pelo qual dividir.
     * @returns Um novo vetor resultante da divisão componente a componente do vetor atual pelo vetor fornecido.
     */
    divide(vector: Vec3): Vec3;

    /**
     * Multiplica o vetor atual pelo vetor fornecido componente a componente e retorna o vetor resultante.
     * @param vector O vetor pelo qual multiplicar.
     * @returns Um novo vetor que é o produto componente a componente do vetor atual pelo vetor fornecido.
     */
    multiply(vector: Vec3): Vec3;

    /**
     * Escala o vetor atual por um valor escalar e retorna o vetor resultante.
     * @param scalar O valor pelo qual o vetor será escalado.
     * @returns Um novo vetor que é o vetor atual escalado pelo valor escalar fornecido.
     */
    scale(scalar: number): Vec3;

    /**
     * Calcula a magnitude (ou comprimento) do vetor atual.
     * @returns A magnitude do vetor atual.
     */
    magnitude(): number;

    /**
     * Normaliza o vetor atual, retornando um vetor com a mesma direção, mas com magnitude igual a 1.
     * @returns Um novo vetor normalizado com magnitude igual a 1.
     */
    normalize(): Vec3;

    /**
     * Calcula o produto escalar (dot product) entre o vetor atual e outro vetor 3D.
     * @param vector O outro vetor para calcular o produto escalar.
     * @returns O produto escalar entre o vetor atual e o vetor fornecido.
     */
    dot(vector: Vec3): number;

    /**
     * Calcula o produto vetorial (cross product) entre o vetor atual e outro vetor 3D.
     * @param vector O outro vetor para calcular o produto vetorial.
     * @returns Um novo vetor que é o produto vetorial entre o vetor atual e o vetor fornecido.
     */
    cross(vector: Vec3): Vec3;

    /**
     * Retorna um novo vetor que é o vetor atual com todos os componentes invertidos.
     * @returns Um novo vetor com todos os componentes do vetor atual multiplicados por -1.
     */
    negative(): Vec3;
    
    /**
     * Retorna uma representação em string do vetor 3D.
     * @returns Uma string representando o vetor no formato "Vector3(x, y, z)".
     */
    toString(): string;
}
