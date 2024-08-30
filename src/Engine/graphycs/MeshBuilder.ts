import EngineCache from "../Cache/EngineCache";
import Vec2 from "../Core/Math/vec2";
import Vec3 from "../Core/Math/vec3";
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
        const normals: number[] = []; // Array para armazenar as normais
        const uvs: number[] = [];
        const indices: number[] = [];

        // Gerar vértices, normais e coordenadas UV
        for (let lat = 0; lat <= latitudes; lat++) {
            const theta = lat * Math.PI / latitudes; // Ângulo latitudinal
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let lon = 0; lon <= longitudes; lon++) {
                const phi = lon * 2 * Math.PI / longitudes; // Ângulo longitudinal
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                // Coordenadas XYZ
                const x = radius * cosPhi * sinTheta;
                const y = radius * cosTheta;
                const z = radius * sinPhi * sinTheta;

                // Coordenadas normais (vetor normalizado do centro da esfera)
                const nx = cosPhi * sinTheta;
                const ny = cosTheta;
                const nz = sinPhi * sinTheta;

                // Coordenadas UV
                const u = lon / longitudes;
                const v = 1 - lat / latitudes; // Inverta V para evitar a inversão da textura

                // Adiciona os dados
                vertices.push(x, y, z);
                normals.push(nx, ny, nz); // Adiciona as normais
                uvs.push(u, v);
            }
        }

        // Gerar índices
        for (let lat = 0; lat < latitudes; lat++) {
            for (let lon = 0; lon < longitudes; lon++) {
                const first = (lat * (longitudes + 1)) + lon;
                const second = first + (longitudes + 1);

                // Adiciona os índices das faces
                indices.push(first, second, first + 1);
                indices.push(second, second + 1, first + 1);
            }
        }

        // Converter arrays para TypedArrays
        const vertexArray = new Float32Array(vertices);
        const normalArray = new Float32Array(normals); // Array de normais
        const uvArray = new Float32Array(uvs);
        const indexArray = new Uint16Array(indices);

        const mesh = new Mesh();
        mesh.vertices = vertexArray;
        mesh.normals = normalArray; // Atribui as normais à malha
        mesh.uvs = uvArray;
        mesh.triangles = indexArray;

        return mesh;
    }

    /**
   * Cria uma malha de quadrado com vértices e índices predefinidos.
   * @returns Uma nova instância de Mesh representando um quadrado.
   */
    public static createSquare(): Mesh {
                                                      
        const vertices: Float32Array = new Float32Array([
            -0.5, -0.5, 0.0, 0.5, -0.5, 0.0,                                
             0.5, 0.5, 0.0, -0.5, 0.5, 0.0                              
        ]);

        const indices: Uint16Array = new Uint16Array([
            0, 1, 2,   // Triângulo 1
            2, 3, 0    // Triângulo 2
        ]);

        // Normais (todos iguais para um plano)
        const normal = [0.0, 0.0, 1.0]; // Normal apontando para fora do plano XY
        const normals: Float32Array = new Float32Array([
            ...normal, // Normal para o Vértice 0
            ...normal, // Normal para o Vértice 1
            ...normal, // Normal para o Vértice 2
            ...normal  // Normal para o Vértice 3
        ]);

        const uvs: Float32Array = new Float32Array([
            0.0, 1.0, // UV para o Vértice 0 (antes era 0.0, 0.0)
            1.0, 1.0, // UV para o Vértice 1 (antes era 1.0, 0.0)
            1.0, 0.0, // UV para o Vértice 2 (antes era 1.0, 1.0)
            0.0, 0.0  // UV para o Vértice 3 (antes era 0.0, 1.0)
        ]);
        
        const mesh = new Mesh();
        mesh.vertices = vertices;
        mesh.normals = normals;
        mesh.uvs = uvs;
        mesh.triangles = indices;

        // Compila o mesh
        mesh.compile(EngineCache.gl);

        return mesh;
    }

    public static createSubdividedPlane(width: number = 100, height: number = 100, segmentsX: number = 10, segmentsZ: number = 10) {
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

        const mesh = new Mesh();

        mesh.vertices = vertices;
        mesh.triangles = indices;
        mesh.uvs = textureCoords;
        mesh.normals = normals;
    
        return mesh;
    }
}