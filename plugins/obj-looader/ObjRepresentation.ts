export default class Obj {
    name: string;
    vertices: number[];
    vertexIndices: number[];
    normals: number[];
    normalIndices: number[];
    UVs: number[];
    uvIndices: number[];
    processedUVs: number[];

    constructor(name: string) {
        this.name = name;
        this.vertices = [];
        this.normals = [];
        this.UVs = [];
        this.vertexIndices = [];
        this.uvIndices = [];
        this.normalIndices = [];
        this.processedUVs = [];
    }

    addVertex(x: number, y: number, z: number) {
        this.vertices.push(x, y, z);
    }

    addNormal(x: number, y: number, z: number) {
        this.normals.push(x, y, z);
    }

    addUV(u: number, v: number) {
        this.UVs.push(u, v);
    }

    addIndex(v1: number, v2: number, v3: number) {
        this.vertexIndices.push(v1, v2, v3);
    }

    addTriangle(
        v1: number, v2: number, v3: number,
        uv1: number | null, uv2: number | null, uv3: number | null,
        n1: number | null, n2: number | null, n3: number | null
    ) {
        this.addIndex(v1, v2, v3);

        if (uv1 !== null && uv2 !== null && uv3 !== null) {
            this.uvIndices.push(uv1, uv2, uv3);
        }

        if (n1 !== null && n2 !== null && n3 !== null) {
            this.normalIndices.push(n1, n2, n3);
        }
    }
 
    public verticesFloat32(): Float32Array {
        return new Float32Array(this.vertices);
    }
 
    public vertexIndicesUint16(): Uint16Array {
        return new Uint16Array(this.vertexIndices);
    }

    public normalsFloat32(): Float32Array {
        return new Float32Array(this.normals);
    }

    public normalIndicesUint16(): Uint16Array {
        return new Uint16Array(this.normalIndices);
    }

    public UVsFloat32(): Float32Array {
        return new Float32Array(this.UVs);
    }

    public uvIndicesUint16(): Uint16Array {
        return new Uint16Array(this.uvIndices);
    }

    public processedUVsFloat32(): Float32Array {
        return new Float32Array(this.processedUVs);
    }

    
    public getIndexedUVs(): number[] {
        const indexedUvs: number[] = [];
        
        // Itera sobre os índices UVs em blocos de 3, pois cada face é um triângulo
        for (let i = 0; i < this.uvIndices.length; i += 3) {
            const uv1Index = this.uvIndices[i] ; // Ajuste para zero-base
            const uv2Index = this.uvIndices[i + 1] ; // Ajuste para zero-base
            const uv3Index = this.uvIndices[i + 2] ; // Ajuste para zero-base
    
            // Adiciona os valores UV ao array
            indexedUvs.push(
                this.UVs[uv1Index * 2], this.UVs[uv1Index * 2 + 1], // UV 1
                this.UVs[uv2Index * 2], this.UVs[uv2Index * 2 + 1], // UV 2
                this.UVs[uv3Index * 2], this.UVs[uv3Index * 2 + 1]  // UV 3
            );
        }
    
        return indexedUvs;
    }
    
}