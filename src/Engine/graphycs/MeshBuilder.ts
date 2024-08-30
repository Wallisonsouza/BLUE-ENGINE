import Mesh from "./Mesh";

  
export default class MeshBuilder {
    /**
   * Cria uma malha de uma pirâmide triangular (uma base triangular com três faces laterais).
   * @returns Uma nova instância de Mesh representando a pirâmide triangular.
   */
    public static createPyramidTriangle(): Mesh{
      // Define os vértices da pirâmide triangular
      const vertices = new Float32Array([
          // Vértices da base
          0.0,  1.0, 0.0,  // Vértice 0 (topo da pirâmide)
      -1.0, -1.0, 1.0,  // Vértice 1 (base)
          1.0, -1.0, 1.0,  // Vértice 2 (base)
          1.0, -1.0, -1.0, // Vértice 3 (base)
      -1.0, -1.0, -1.0, // Vértice 4 (base)
      ]);

      // Define os índices que formam as faces da pirâmide triangular
      const indices = new Uint16Array([
          // Faces laterais
          0, 1, 2,  // Face 1 (frontal)
          0, 2, 3,  // Face 2 (lateral direita)
          0, 3, 4,  // Face 3 (lateral traseira)
          0, 4, 1,  // Face 4 (lateral esquerda)

          // Base (visível de baixo)
          1, 2, 3,
          1, 3, 4,
      ]);

      return new Mesh(vertices, indices);
  }

  /**
   * Cria uma malha de esfera com vértices e índices predefinidos.
   * @param radius - O raio da esfera.
   * @param latitudes - Número de divisões latitudinais.
   * @param longitudes - Número de divisões longitudinais.
   * @returns Uma nova instância de Mesh representando uma esfera.
   */
  public static createSphere(radius: number = 1, latitudes: number = 16, longitudes: number = 16): Mesh {
      const vertices: number[] = [];
      const indices: number[] = [];

      // Gerar vértices
      for (let lat = 0; lat <= latitudes; lat++) {
          const theta = lat * Math.PI / latitudes;
          const sinTheta = Math.sin(theta);
          const cosTheta = Math.cos(theta);

          for (let lon = 0; lon <= longitudes; lon++) {
              const phi = lon * 2 * Math.PI / longitudes;
              const sinPhi = Math.sin(phi);
              const cosPhi = Math.cos(phi);

              const x = radius * cosPhi * sinTheta;
              const y = radius * cosTheta;
              const z = radius * sinPhi * sinTheta;

              vertices.push(x, y, z);
          }
      }

      // Gerar índices
      for (let lat = 0; lat < latitudes; lat++) {
          for (let lon = 0; lon < longitudes; lon++) {
              const first = (lat * (longitudes + 1)) + lon;
              const second = first + (longitudes + 1);

              indices.push(first, second, first + 1);
              indices.push(second, second + 1, first + 1);
          }
      }

      // Converter arrays para TypedArrays
      const vertexArray = new Float32Array(vertices);
      const indexArray = new Uint16Array(indices);

      return new Mesh(vertexArray, indexArray);
  }

  /**
   * Cria uma malha de quadrado com vértices e índices predefinidos.
   * @returns Uma nova instância de Mesh representando um quadrado.
   */
  public static createSquare(): Mesh {
      // Define os vértices do quadrado
      const vertices = new Float32Array([
          -0.5, -0.5, 0.0,  // Vértice 0 (esquerda inferior)
          0.5, -0.5, 0.0,  // Vértice 1 (direita inferior)
          0.5,  0.5, 0.0,  // Vértice 2 (direita superior)
          -0.5,  0.5, 0.0   // Vértice 3 (esquerda superior)
      ]);

      // Define os índices para desenhar dois triângulos que formam o quadrado
      const indices = new Uint16Array([
          0, 1, 2,  // Primeiro triângulo
          0, 2, 3   // Segundo triângulo
      ]);

      return new Mesh(vertices, indices);
  }
  
 public static createSubdividedPlane(width: number = 10, height: number = 10, segmentsX: number = 10, segmentsZ: number = 10) {
      const vertices: number[] = [];
      const indices: number[] = [];
      
      const stepX = width / segmentsX;
      const stepZ = height / segmentsZ;
      
      // Gerar vértices
      for (let z = 0; z <= segmentsZ; z++) {
          for (let x = 0; x <= segmentsX; x++) {
              vertices.push(x * stepX - width / 2, 0, z * stepZ - height / 2);
          }
      }
      
      // Gerar índices dos triângulos
      for (let z = 0; z < segmentsZ; z++) {
          for (let x = 0; x < segmentsX; x++) {
              const i = z * (segmentsX + 1) + x;
              const i1 = i + 1;
              const i2 = i + (segmentsX + 1);
              const i3 = i2 + 1;
  
              indices.push(i, i2, i1);
              indices.push(i1, i2, i3);
          }
      }

      return new Mesh(new Float32Array(vertices), new Uint16Array(indices))
  }

  
  /**
   * Cria uma malha de cubo com vértices e índices predefinidos.
   * @returns Uma nova instância de Mesh representando um cubo.
   */
  public static createCube() {
      // Definindo os vértices do cubo
      const vertices = new Float32Array([
          // Face frontal
          -0.5, -0.5,  0.5,   // V0
           0.5, -0.5,  0.5,   // V0.5
           0.5,  0.5,  0.5,   // V2
          -0.5,  0.5,  0.5,   // V3
          
          // Face traseira
          -0.5, -0.5, -0.5,   // V4
           0.5, -0.5, -0.5,   // V5
           0.5,  0.5, -0.5,   // V6
          -0.5,  0.5, -0.5,   // V7
  
          // Face esquerda
          -0.5, -0.5, -0.5,   // V4
          -0.5, -0.5,  0.5,   // V0
          -0.5,  0.5,  0.5,   // V3
          -0.5,  0.5, -0.5,   // V7
  
          // Face direita
           0.5, -0.5, -0.5,   // V5
           0.5, -0.5,  0.5,   // V0.5
           0.5,  0.5,  0.5,   // V2
           0.5,  0.5, -0.5,   // V6
  
          // Face superior
          -0.5,  0.5, -0.5,   // V7
          -0.5,  0.5,  0.5,   // V3
           0.5,  0.5,  0.5,   // V2
           0.5,  0.5, -0.5,   // V6
  
          // Face inferior
          -0.5, -0.5, -0.5,   // V4
          -0.5, -0.5,  0.5,   // V0
           0.5, -0.5,  0.5,   // V0.5
           0.5, -0.5, -0.5    // V5
      ]);
  
      // Definindo as normais do cubo
      const normals = new Float32Array([
          // Normais para cada face
          0,  0,  1,   // Face frontal
          0,  0, -1,   // Face traseira
         -1,  0,  0,   // Face esquerda
          1,  0,  0,   // Face direita
          0,  1,  0,   // Face superior
          0, -1,  0    // Face inferior
      ]);
  
      // Definindo as coordenadas de textura
      const textureCoords = new Float32Array([
          // Coordenadas de textura para cada face
          0, 0,   1, 0,   1, 1,   0, 1,  // Face frontal
          0, 0,   1, 0,   1, 1,   0, 1,  // Face traseira
          0, 0,   1, 0,   1, 1,   0, 1,  // Face esquerda
          0, 0,   1, 0,   1, 1,   0, 1,  // Face direita
          0, 0,   1, 0,   1, 1,   0, 1,  // Face superior
          0, 0,   1, 0,   1, 1,   0, 1   // Face inferior
      ]);
  
      // Definindo os índices para cada face
      const indices = new Uint16Array([
          // Face frontal
          0, 1, 2,  0, 2, 3,
          // Face traseira
          4, 5, 6,  4, 6, 7,
          // Face esquerda
          8, 9, 10, 8, 10, 11,
          // Face direita
          12, 13, 14, 12, 14, 15,
          // Face superior
          16, 17, 18, 16, 18, 19,
          // Face inferior
          20, 21, 22, 20, 22, 23
      ]);
  
      return new Mesh(vertices, indices, textureCoords, normals);
  }

  public static createCubeFromOBJ() {
    
  }
  
}