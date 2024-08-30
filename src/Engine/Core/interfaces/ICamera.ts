import Mat4 from "../Math/Mat4";
import Transform from "../Inplementations/Transform";

export interface ICamera {
    /**
     * A transformação da câmera, incluindo posição, rotação e escala.
     * Define onde a câmera está posicionada e para onde ela está olhando.
     */
    transform: Transform;

    /**
     * A distância do plano de corte próximo (near plane) em relação à câmera.
     * Objetos mais próximos que essa distância não serão renderizados.
     */
    nearPlane: number;

    /**
     * A distância do plano de corte distante (far plane) em relação à câmera.
     * Objetos mais distantes que essa distância não serão renderizados.
     */
    farPlane: number;

    /**
     * A razão de aspecto (aspect ratio) da câmera, geralmente definida como a largura dividida pela altura.
     * Influencia a forma como o campo de visão é projetado.
     */
    aspectRatio: number;

    /**
     * O campo de visão vertical da câmera em graus, utilizado em projeções perspectiva.
     * Define o ângulo do campo de visão da câmera ao projetar o espaço 3D para o espaço 2D.
     */
    fieldOfView: number;

    /**
     * Um booleano que indica se o buffer de profundidade (depth buffer) está ativado para o cálculo da renderização.
     * Se verdadeiro, a câmera levará em conta a profundidade para renderizar objetos na ordem correta.
     */
    depth: boolean;

    /**
     * Retorna a matriz de visualização (view matrix) da câmera.
     * A matriz de visualização é usada para transformar as coordenadas do espaço do mundo para o espaço da câmera.
     * @returns A matriz de visualização.
     */
    getViewMatrix(): Mat4;

    /**
     * Retorna a matriz de projeção (projection matrix) da câmera.
     * A matriz de projeção é usada para transformar as coordenadas do espaço da câmera para o espaço de tela.
     * @returns A matriz de projeção.
     */
    getProjectionMatrix(): Mat4;
}
