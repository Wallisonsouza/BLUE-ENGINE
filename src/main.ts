import EngineCache from "./Engine/Cache/EngineCache";
import Vec2 from "./Engine/Core/Math/vec2";
import Vec3 from "./Engine/Core/Math/vec3";

import Engine from "./Engine/engine";
import Mesh from "./Engine/graphycs/Mesh";
import ScryptManager from "./Engine/Managers/ScryptManager";
import ImportObjFormat from "./Lib/InportObjFormat/ImportObjFormat";
import SimpleEngine from "./SimpleEngine";


class ObjFormat {
    name: string;
    vertices: Vec3[];
    normals: Vec3[];
   
    vertexIndices: number[];
    UVs: Vec2[];
    uvIndices: (number | null)[];
    normalIndices: (number | null)[];

    constructor(name: string) {
        this.name = name;
        this.vertices = [];
        this.normals = [];
        this.UVs = [];
        this.vertexIndices = [];
        this.uvIndices = [];
        this.normalIndices = [];
    }
   
    getVertexIndicesUint16Array(): Uint16Array {
        return new Uint16Array(this.vertexIndices);
    }
    getUVsIndicesUint16Array(): Uint16Array {
        const filteredIndices = this.uvIndices.filter((index): index is number => index !== null);
        return new Uint16Array(filteredIndices);
    }

    addTriangle(v1: number, v2: number, v3: number, uv1: number | null, uv2: number | null, uv3: number | null, n1: number | null, n2: number | null, n3: number | null) {
        this.vertexIndices.push(v1, v2, v3);
        this.uvIndices.push(uv1, uv2, uv3);
        this.normalIndices.push(n1, n2, n3);
    }

    getVerticesFloat32Array(): Float32Array {
        return Vec3.vec3ArrayToFloat32Array(this.vertices);
    }
    getNormalsFloat32Array(): Float32Array {
        return Vec3.vec3ArrayToFloat32Array(this.normals);
    }
    getUVsFloat32Array(): Float32Array {
        return Vec2.vec2ArrayToFloat32Array(this.UVs);
    }
}

function parseObj(text: string): ParsedResult {
    const lines = text.trim().split('\n');
    const result: ParsedResult = {
        objects: []
    };

    let currentObject: ObjFormat | null = null;
    const objectRE = /^#\s*object\s+(.+)$/;
    const objectRE1 = /^o\s+(.+)$/;

    lines.forEach(line => {
        line = line.trim();

        const objectMatch = line.match(objectRE);
        const objectMatch1 = !objectMatch ? line.match(objectRE1) : null;
        if (objectMatch || objectMatch1) {
            if (currentObject !== null) {
                result.objects.push(currentObject);
            }
            const match = objectMatch || objectMatch1;
            if (match) {
                currentObject = new ObjFormat(match[1].trim());
            }
          
        } else if (currentObject) {
            if (line.startsWith('v ')) {
                const [, x, y, z] = line.split(/\s+/).map(parseFloat);
                currentObject.vertices.push(new Vec3(x, y, z));

            } else if (line.startsWith('vn ')) {
                const [, x, y, z] = line.split(/\s+/).map(parseFloat);
                currentObject.normals.push(new Vec3(x, y, z));

            } else if (line.startsWith('vt ')) {
                const [, u, v] = line.split(/\s+/).map(parseFloat);
                currentObject.UVs.push(new Vec2(u, v));

            } else if (line.startsWith('f ')) {
                const faceParts = line.substring(2).trim().split(/\s+/);

                if (faceParts.length === 3) {
                    const [v1, v2, v3] = faceParts.map(part => part.split('/').map(index => index.trim()));
                    currentObject.addTriangle(
                        parseInt(v1[0], 10) - 1, parseInt(v2[0], 10) - 1, parseInt(v3[0], 10) - 1,
                        v1[1] ? parseInt(v1[1], 10) - 1 : null, v2[1] ? parseInt(v2[1], 10) - 1 : null, v3[1] ? parseInt(v3[1], 10) - 1 : null,
                        v1[2] ? parseInt(v1[2], 10) - 1 : null, v2[2] ? parseInt(v2[2], 10) - 1 : null, v3[2] ? parseInt(v3[2], 10) - 1 : null
                    );

                } else if (faceParts.length === 4) {
                    const [v1, v2, v3, v4] = faceParts.map(part => part.split('/').map(index => index.trim()));
                    currentObject.addTriangle(
                        parseInt(v1[0], 10) - 1, parseInt(v2[0], 10) - 1, parseInt(v3[0], 10) - 1,
                        v1[1] ? parseInt(v1[1], 10) - 1 : null, v2[1] ? parseInt(v2[1], 10) - 1 : null, v3[1] ? parseInt(v3[1], 10) - 1 : null,
                        v1[2] ? parseInt(v1[2], 10) - 1 : null, v2[2] ? parseInt(v2[2], 10) - 1 : null, v3[2] ? parseInt(v3[2], 10) - 1 : null
                    );
                    currentObject.addTriangle(
                        parseInt(v3[0], 10) - 1, parseInt(v4[0], 10) - 1, parseInt(v1[0], 10) - 1,
                        v3[1] ? parseInt(v3[1], 10) - 1 : null, v4[1] ? parseInt(v4[1], 10) - 1 : null, v1[1] ? parseInt(v1[1], 10) - 1 : null,
                        v3[2] ? parseInt(v3[2], 10) - 1 : null, v4[2] ? parseInt(v4[2], 10) - 1 : null, v1[2] ? parseInt(v1[2], 10) - 1 : null
                    );
                }

            }
        }
    });

    if (currentObject !== null) {
        result.objects.push(currentObject);
    }

    return result;
}

interface ParsedResult {
    objects: ObjFormat[];
}


async function initialize() {
    try {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) {
            throw new Error("Canvas não encontrado.");
        }

        ScryptManager.addNewScrypt(new SimpleEngine());
        const engine = new Engine(canvas);

        const objImporter = new ImportObjFormat('./src/Assets/3D/Grass_Block.obj');
        try {
            const objData = await objImporter.loadOBJ();
            const parserResult = parseObj(objData).objects[0];
            
            const mesh = new Mesh();
            mesh.vertices = parserResult.getVerticesFloat32Array();
            mesh.vertexIndices = parserResult.getVertexIndicesUint16Array();
            mesh.UVs = parserResult.getUVsFloat32Array();
            mesh.UVIndices = parserResult.getUVsIndicesUint16Array();
            mesh.compile();
            
            EngineCache.meshTeste = mesh;
        } catch (error) {
            console.error('Falha ao carregar o arquivo OBJ:', error.message);
        }
       
        
    
        await engine.loadResources();
        engine.initialize();
        console.log("Engine inicializado com sucesso.");

    } catch (error) {
        console.error("Erro durante a inicialização:", error);
    }
}

initialize();


window.addEventListener("wheel", (event) => {

    if(event.ctrlKey) {
        event.preventDefault();
    }
    
}, {passive: false});

window.addEventListener("gesturestart", function(event) {
    event.preventDefault();
});

window.addEventListener("gesturechange", function(event) {
    event.preventDefault();
});

window.addEventListener("gesture", function(event) {
    event.preventDefault();
});

window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})





// triangulate(): { indices: Uint16Array, uvIndices: (number | null)[], normalIndices: (number | null)[] } {
//     const indices: number[] = [];
//     const uvIndices: (number | null)[] = [];
//     const normalIndices: (number | null)[] = [];

//     const vertices2D = this.vertices.map(v => new Vec2(v.x, v.y));
//     const vertexMap = new Map<string, number>();

//     // Cria um mapa de vértices para mapeamento rápido
//     this.vertices.forEach((vertex, index) => {
//         vertexMap.set(`${vertex.x},${vertex.y}`, index);
//     });

//     const triangulatedIndices = earClipping(vertices2D);

//     triangulatedIndices.forEach(index => {
//         indices.push(index);
//         uvIndices.push(this.uvIndices[index] ?? null);
//         normalIndices.push(this.normalIndices[index] ?? null);
//     });

//     return {
//         indices: new Uint16Array(indices),
//         uvIndices,
//         normalIndices
//     };
// }
// function earClipping(vertices: Vec2[]): number[] {
//     const indices: number[] = [];
//     const n = vertices.length;

//     if (n < 3) return indices;

//     let vertIndices = vertices.map((_, i) => i);

//     while (vertIndices.length > 3) {
//         let earFound = false;

//         for (let i = 0; i < vertIndices.length; i++) {
//             let prev = vertIndices[(i - 1 + vertIndices.length) % vertIndices.length];
//             let curr = vertIndices[i];
//             let next = vertIndices[(i + 1) % vertIndices.length];

//             const a = vertices[prev];
//             const b = vertices[curr];
//             const c = vertices[next];

//             if (isPointInTriangle(vertices[curr], a, b, c) || isPointInTriangle(vertices[prev], a, b, c)) continue;

//             let isEar = true;
//             for (let j = 0; j < vertIndices.length; j++) {
//                 if (j === i || j === (i + 1) % vertIndices.length || j === (i - 1 + vertIndices.length) % vertIndices.length) continue;
//                 if (isPointInTriangle(vertices[vertIndices[j]], a, b, c)) {
//                     isEar = false;
//                     break;
//                 }
//             }

//             if (isEar) {
//                 indices.push(prev, curr, next);
//                 vertIndices.splice(i, 1);
//                 earFound = true;
//                 break;
//             }
//         }

//         if (!earFound) {
//             throw new Error('No ear found. The polygon might be self-intersecting.');
//         }
//     }

//     indices.push(...vertIndices);

//     return indices;
// }

// function isPointInTriangle(p: Vec2, a: Vec2, b: Vec2, c: Vec2): boolean {
//     const sign = (p1: Vec2, p2: Vec2, p3: Vec2) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
//     const b1 = sign(p, a, b) < 0.0;
//     const b2 = sign(p, b, c) < 0.0;
//     const b3 = sign(p, c, a) < 0.0;
//     return (b1 === b2) && (b2 === b3);
// }
