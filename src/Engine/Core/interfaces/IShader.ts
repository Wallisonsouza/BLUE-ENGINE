/**
 * Representa um shader no contexto WebGL, incluindo seus códigos fonte para os shaders de vértices e fragmentos,
 * o programa do shader WebGL e as localizações de atributos e uniformes.
 */
export default interface IShader {
    /**
     * Código fonte para o shader de vértices.
     * Define o comportamento dos vértices e é compilado em um shader de vértices WebGL.
     */
    vertSource: string;

    /**
     * Código fonte para o shader de fragmentos.
     * Define o comportamento dos fragmentos e é compilado em um shader de fragmentos WebGL.
     */
    fragSource: string;

    /**
     * O programa do shader WebGL compilado.
     * Contém o shader de vértices e o shader de fragmentos compilados e vinculados.
     */
    shaderProgram: WebGLProgram | null;

    /**
     * Localização do atributo de vértices no shader de vértices.
     * Usada para vincular dados de vértices com o shader de vértices.
     */
    vertLocation: number;

    /**
     * Localização do uniforme no shader de fragmentos.
     * Usada para vincular dados uniformes com o shader de fragmentos.
     */
    fragLocation: number;
}