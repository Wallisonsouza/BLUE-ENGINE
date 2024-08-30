import Quat from "../Math/quat";
import Vec3 from "../Math/vec3";

export interface ITransform {
    /**
     * A posição do objeto no espaço 3D.
     */
    position: Vec3;

    /**
     * A rotação do objeto representada por um quaternion.
     */
    rotation: Quat;

    /**
     * A escala do objeto, que pode ser usada para aumentar ou diminuir seu tamanho.
     */
    scale: Vec3;

   /**
     * Retorna a direção para a frente (forward) do objeto, baseada na sua rotação atual.
     * Essa direção geralmente é usada para determinar para onde o objeto está "olhando" ou movendo-se.
     */
    getForwardDirection(): Vec3;

   /**
    * Retorna a direção para cima (up) do objeto, baseada na sua rotação atual.
    * Essa direção geralmente é usada para determinar a orientação vertical do objeto.
    */
    getUpDirection(): Vec3;

   /**
    * Retorna a direção para a direita (right) do objeto, baseada na sua rotação atual.
    * Essa direção é perpendicular tanto à direção para a frente quanto à direção para cima.
    */
    getRightDirection(): Vec3;

   /**
    * Retorna a direção para trás (backward) do objeto, baseada na sua rotação atual.
    * Essa direção é oposta à direção para a frente.
    */
   getBackwardDirection(): Vec3;

}