/**
 * Interface para gerenciar shaders WebGL.
 */
export default interface IShader {
    /**
     * Define o código fonte para o shader de fragmento.
     * @param source - O código fonte para o shader de fragmento.
     */
    setFragSource(source: string): void;

    /**
     * Define o código fonte para o shader de vértice.
     * @param source - O código fonte para o shader de vértice.
     */
    setVertSource(source: string): void;

    /**
     * Compila o programa de shader e define valores padrão para os uniformes.
     */
    compile(): void;

    /**
     * Ativa o programa de shader para uso.
     */
    use(): void;

    /**
     * Desativa o programa de shader.
     */
    deactivate(): void;

    /**
     * Define um uniforme de ponto flutuante com 2 componentes.
     * @param name - O nome do uniforme.
     * @param x - O componente x.
     * @param y - O componente y.
     */
    setUniform2f(name: string, x: number, y: number): void;

    /**
     * Define um uniforme de matriz 4x4.
     * @param name - O nome do uniforme.
     * @param matrix - A matriz 4x4.
     */
    setUniformMatrix4fv(name: string, matrix: Float32Array): void;

    /**
     * Obtém a localização de um atributo no programa de shader.
     * @param name - O nome do atributo.
     * @returns A localização do atributo ou null se não encontrado.
     */
    getAttributeLocation(name: string): number | null;

    /**
     * Obtém a localização de um uniforme no programa de shader.
     * @param name - O nome do uniforme.
     * @returns A localização do uniforme ou null se não encontrado.
     */
    getUniformLocation(name: string): WebGLUniformLocation | null;

    /**
     * Libera os recursos do WebGL associados a este programa de shader.
     */
    dispose(): void;
}
