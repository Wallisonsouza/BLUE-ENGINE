// // import Camera from "../Core/Inplementations/Camera";
// // import Material from "../Core/Inplementations/Material";

// // import Shader from "../Core/Inplementations/Shader";
// // import Transform from "../Core/Inplementations/Transform";
// // import Mat4 from "./matrix4x4";

// // class Editor {
// //     camera: Camera = new Camera();
    
// //     constructor(){
// //         this.camera.farPlane = 10000;
// //     }
// // }

// // export default class WebGLLink {

// //     public editor: Editor = new Editor(); 
// //     public gl: WebGLRenderingContext | null = null;
// //     public defaultCamera: Camera = new Camera();
// //     public transform: Transform = new Transform();
    
// //     public material2D: Material = new Material();
    
// //     public trocarCamera: boolean = false;
// //     constructor(canvas: HTMLCanvasElement) {
// //         this.gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

// //         if (!this.gl) {
// //             console.error("O contexto WebGL não está disponível.");
// //             return;
// //         }

// //         this.material2D.shader.compileShader(this.gl)
        
      
// //     }

// //     // public drawFillRect(x: number= 0, y: number = 0, z: number = 0, width: number = 1, height: number = 1) {
// //     //     if (!this.gl || !this.material3D.shader.shaderProgram) return;
// //     //     const [r, g, b, a] = this.editor.camera.clearColor.toVec4();
// //     //     this.gl.clearColor(r, g, b, a);
      
// //     //     // Define a metade da largura e altura
// //     //     const halfWidth = width / 2;
// //     //     const halfHeight = height / 2;

    
// //     //     const vertices = new Float32Array([
// //     //         x - halfWidth, y - halfHeight, z,
// //     //         x + halfWidth, y - halfHeight, z,
// //     //         x - halfWidth, y + halfHeight, z,
// //     //         x + halfWidth, y + halfHeight, z
// //     //     ]);
    
// //     //     this.gl.useProgram(this.material3D.shader.shaderProgram);
        
// //     //     const vertexBuffer = WebGL.createVertexBuffer(this.gl, vertices, BufferUsage.STATIC_DRAW);

// //     //     const positionLoc = this.gl.getAttribLocation(this.material3D.shader.shaderProgram, "a_position");
// //     //     this.gl.enableVertexAttribArray(positionLoc);
// //     //     const numComponents = 3;    // (x, y, z)
// //     //     const type = this.gl.FLOAT; // 32bit floating point values
// //     //     const normalize = false;    // leave the values as they are
// //     //     const offset = 0;           // start at the beginning of the buffer
// //     //     const stride = 0;           // how many bytes to move to the next vertex
// //     //     this.gl.vertexAttribPointer(positionLoc, numComponents, type, normalize, stride, offset);
        
// //     //     this.setUniforms(this.gl, this.material3D.shader.shaderProgram);
       
// //     //     if (this.editor.camera.depth) {
// //     //         this.gl.enable(this.gl.DEPTH_TEST); 
// //     //     } else {
// //     //         this.gl.disable(this.gl.DEPTH_TEST); 
// //     //     }
      
// //     //     this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
// //     //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
// //     //     this.gl.deleteBuffer(vertexBuffer);
        
// //     // }


















// //     private setUniforms(gl:WebGLRenderingContext, program: WebGLProgram) {

// //         if(gl && program){
           
// //             const translation = Mat4.translate(this.transform.position);
// //             this.material2D.shader.send<Mat4>(gl, "u_translation", translation);
            
// //             const rotation = Mat4.rotate(this.transform.rotation);
// //             this.material2D.shader.send<Mat4>(gl, "u_rotation", rotation);
            
// //             const scale = Mat4.scale(this.transform.scale);
// //             this.material2D.shader.send<Mat4>(gl, "u_scale", scale);
            
// //             const view = this.editor.camera.getViewMatrix();
// //             this.material2D.shader.send<Mat4>(gl, "u_view", view);

// //             const projection = this.defaultCamera.getProjectionMatrix();
// //             this.material2D.shader.send<Mat4>(gl, "u_projection", projection);
            
// //             // const color = this.material2D.color;
// //             // this.material2D.shader.send<Color>(gl, "u_color", color);
// //         }
// //     }
   
// //     // public drawSimpleLine(start: Vec3, end: Vec3, color: Color = Color.white) {
// //     //     if (!this.gl || !this.material3D.shader.shaderProgram) {
// //     //         console.error("Erro ao carregar o programa gl, ou o shaderProgram");
// //     //         return;
// //     //     }
    
// //     //     const shaderProgram = this.material3D.shader.shaderProgram;
// //     //     this.gl.useProgram(shaderProgram);
    
// //     //     const vertices = new Float32Array([
// //     //         start.x, start.y, start.z,
// //     //         end.x, end.y, end.z
// //     //     ]);
    
// //     //     const vertexBuffer = this.gl.createBuffer();
// //     //     if (!vertexBuffer) {
// //     //         console.error("Não foi possível criar o buffer de vértices.");
// //     //         return;
// //     //     }
    
// //     //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
// //     //     this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    
// //     //     const positionLocation = this.gl.getAttribLocation(shaderProgram, "a_position");
// //     //     if (positionLocation === -1) {
// //     //         console.error("Não foi possível encontrar o atributo 'a_position' no shader.");
// //     //         return;
// //     //     }
    
// //     //     this.gl.enableVertexAttribArray(positionLocation);
// //     //     this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
  
// //     //     this.setUniforms(this.gl, this.material3D.shader.shaderProgram)
    
// //     //     this.gl.drawArrays(this.gl.LINES, 0, vertices.length / 3);
    
// //     //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
// //     //     this.gl.deleteBuffer(vertexBuffer);
// //     // }
   
    
// //     // public drawLine(start: Vec3, end: Vec3, lineWidth: number = 0.05) {
// //     //     if (!this.gl || !this.material.shader.shaderProgram) {
// //     //         console.error("Erro ao carregar o programa gl, ou o shaderProgram");
// //     //         return;
// //     //     }
    
// //     //     const shaderProgram = this.material.shader.shaderProgram;
// //     //     this.gl.useProgram(shaderProgram);
    
// //     //     const direction = end.subtract(start).normalize();
// //     //     const perpendicular = new Vec3(-direction.y, direction.x, 0).normalize().scale(lineWidth / 2);
    
// //     //     const vertices = new Float32Array([
// //     //         start.x + perpendicular.x, start.y + perpendicular.y, start.z,
// //     //         end.x + perpendicular.x, end.y + perpendicular.y, end.z,
// //     //         end.x - perpendicular.x, end.y - perpendicular.y, end.z,
    
// //     //         start.x + perpendicular.x, start.y + perpendicular.y, start.z,
// //     //         end.x - perpendicular.x, end.y - perpendicular.y, end.z,
// //     //         start.x - perpendicular.x, start.y - perpendicular.y, start.z,
// //     //     ]);
    
// //     //     const vertexBuffer = this.gl.createBuffer();
// //     //     if (!vertexBuffer) {
// //     //         console.error("Não foi possível criar o buffer de vértices.");
// //     //         return;
// //     //     }
    
// //     //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
// //     //     this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
    
// //     //     const positionLocation = this.gl.getAttribLocation(shaderProgram, "a_position");
// //     //     if (positionLocation === -1) {
// //     //         console.error("Não foi possível encontrar o atributo 'a_position' no shader.");
// //     //         return;
// //     //     }
    
// //     //     this.gl.enableVertexAttribArray(positionLocation);
// //     //     this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
    
// //     //     this.setUniforms(this.gl, shaderProgram);
    
// //     //     this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length / 3);
    
// //     //     this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
// //     //     this.gl.deleteBuffer(vertexBuffer);
// //     // }


// //     // private gridVertices() {

// //     //     const vertices: number[] = [];
// //     //     const colors: number[] = [];

// //     //     const width = 100; 
// //     //     const widthDivisions = 100; 
// //     //     const heightDivisions = 100; 
// //     //     const height = 100; 
// //     //     const cellSize = 1; 
        
// //     //     // Função para desenhar o grid
// //     //     const drawGrid = (width: number, height: number, cellSize: number, widthDivisions: number) => {
// //     //         const totalWidth = width * cellSize;
// //     //         const totalHeight = height * cellSize;
            
// //     //         // Calcula o passo entre as linhas
// //     //         const stepX = totalWidth / widthDivisions;
// //     //         const stepY = totalHeight / heightDivisions;
        
// //     //         // Desenha as linhas verticais do grid
// //     //         for (let x = -totalWidth / 2; x <= totalWidth / 2; x += stepX) {
// //     //             vertices.push(x, -totalHeight / 2, 0);
// //     //             vertices.push(x, totalHeight / 2, 0);
// //     //             colors.push(1, 1, 1, 1); // Cor branca com alpha total
// //     //             colors.push(1, 1, 1, 1); // Cor branca com alpha total
// //     //         }
            
// //     //         // Desenha as linhas horizontais do grid
// //     //         for (let y = -totalHeight / 2; y <= totalHeight / 2; y += stepY) {
// //     //             vertices.push(-totalWidth / 2, y, 0);
// //     //             vertices.push(totalWidth / 2, y, 0);
// //     //             colors.push(1, 1, 1, 1); // Cor branca com alpha total
// //     //             colors.push(1, 1, 1, 1); // Cor branca com alpha total
// //     //         }
// //     //     };
        
// //     //     // Desenha o grid
// //     //     drawGrid(width, height, cellSize, widthDivisions);
        
// //     //     return { vertices, colors };
        
// //     // }

// //     private gridVertices() {
// //     const vertices: number[] = [];
// //     const colors: number[] = [];

// //     const baseWidth = 100;
// //     const baseHeight = 100;
// //     const baseCellSize = 1;
// //     const initialDivisions = 10;
// //     const maxSubdivisions = 5; // Limite máximo de subdivisões

// //     const cameraPosition = this.editor.camera.transform.position;

// //     const drawInfiniteGrid = (baseWidth: number, baseHeight: number, baseCellSize: number, divisions: number, subdivisions: number) => {
// //         const distanceY = Math.abs(cameraPosition.y);

// //         // Calcula o fator de escala com base na altura da câmera
// //         const scaleFactor = Math.pow(2, Math.min(subdivisions, Math.floor(distanceY / 10)));
// //         const cellSize = baseCellSize * scaleFactor;

// //         const totalWidth = baseWidth * cellSize;
// //         const totalHeight = baseHeight * cellSize;

// //         const stepX = totalWidth / divisions;
// //         const stepZ = totalHeight / divisions;

// //         const startX = Math.floor(cameraPosition.x / stepX) * stepX - totalWidth / 2;
// //         const endX = Math.floor(cameraPosition.x / stepX) * stepX + totalWidth / 2;
// //         const startZ = Math.floor(cameraPosition.z / stepZ) * stepZ - totalHeight / 2;
// //         const endZ = Math.floor(cameraPosition.z / stepZ) * stepZ + totalHeight / 2;

// //         for (let x = startX; x <= endX; x += stepX) {
// //             vertices.push(x, 0, startZ);
// //             vertices.push(x, 0, endZ);
// //             colors.push(1, 1, 1, 1);
// //             colors.push(1, 1, 1, 1);
// //         }

// //         for (let z = startZ; z <= endZ; z += stepZ) {
// //             vertices.push(startX, 0, z);
// //             vertices.push(endX, 0, z);
// //             colors.push(1, 1, 1, 1);
// //             colors.push(1, 1, 1, 1);
// //         }
// //     };

// //     // Limite as subdivisões para evitar sobrecarga
// //     for (let i = 0; i < maxSubdivisions; i++) {
// //         drawInfiniteGrid(baseWidth, baseHeight, baseCellSize, initialDivisions, i);
// //     }

// //     return { vertices, colors };
// // }


// //     public drawGrid(direction: "X" | "Y" | "Z") {
        
    
// //        const {vertices, colors} = this.gridVertices();
    
// //         this.check2D((gl, program) => {
// //             // Criação e configuração do buffer de vértices
// //             const vertexBuffer = gl.createBuffer();
// //             gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// //             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// //             // Criação e configuração do buffer de cores
// //             const colorBuffer = gl.createBuffer();
// //             gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
// //             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

// //             gl.useProgram(program);

// //             // Configuração do atributo de posição
// //             const positionLocation = Shader.getAttributeLocation(gl, program, "a_position");
// //             gl.enableVertexAttribArray(positionLocation);
// //             gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
// //             gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

// //             // Configuração do atributo de cor
// //             const colorLocation = Shader.getAttributeLocation(gl, program, "a_color");
// //             gl.enableVertexAttribArray(colorLocation);
// //             gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); // Corrigido: Use colorBuffer aqui
// //             gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

// //             this.setUniforms(gl, program)

// //             // Configurações de blend
// //             gl.enable(gl.BLEND);
// //             gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

// //             // Desativa o teste de profundidade
// //             gl.disable(gl.DEPTH_TEST);

// //             // Desenha os vértices
// //             gl.drawArrays(gl.LINES, 0, vertices.length / 3);

// //             // Limpeza
// //             gl.bindBuffer(gl.ARRAY_BUFFER, null);
// //             gl.deleteBuffer(vertexBuffer);
// //             gl.deleteBuffer(colorBuffer);
// //         });

// //     }
    

// //     // public check3D(callback: (gl: WebGLRenderingContext, shaderProgram: WebGLProgram) => void): void {
// //     //     const shaderProgram = this.material3D.shader.shaderProgram;
// //     //     const gl = this.gl;
    
// //     //     if (!gl || !shaderProgram) {
// //     //         console.error("WebGL context ou shaderProgram não disponível.");
// //     //         return;
// //     //     }
        
// //     //     callback(gl, shaderProgram);
// //     // }

// //     public check2D(callback: (gl: WebGLRenderingContext, shaderProgram: WebGLProgram) => void): void {
// //         const shaderProgram = this.material2D.shader.shaderProgram;
// //         const gl = this.gl;
    
// //         if (!gl || !shaderProgram) {
            
// //             return;
// //         }
        
// //         callback(gl, shaderProgram);
// //     }


// //     // public drawMesh(mesh: Mesh, color: Color = Color.white) {

// //     //     this.check3D( (gl, program) => {
       
// //     //         gl.useProgram(program);

// //     //         if(!mesh.inicializado) {
// //     //             mesh.initialize(gl);
// //     //         }

// //     //         // Inicializa os buffers da malha
            
            
// //     //         const positionLocation = Shader.getAttributeLocation(gl, program, "a_position");
// //     //         gl.enableVertexAttribArray(positionLocation);
// //     //         gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        
// //     //         this.transform.position = new Vec3(0, 0, 1);
// //     //         this.setUniforms(gl, program)
            
// //     //         // Desenha a malha
// //     //         gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0);
        
// //     //         // Limpa os buffers
// //     //         gl.bindBuffer(gl.ARRAY_BUFFER, null);
// //     //         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
// //     //         // // Opcional: Se a malha for descartada, limpe os buffers
// //     //         // mesh.dispose(gl);
// //     //     })
        
// //     // }
// // }

// // // public saveCamera() {
// // //     if (this.editorCamera && this.editorCamera.transform.position) {
// // //         const cameraData = {
// // //             position: Vec3.toArray(this.editorCamera.transform.position),
// // //             rotation: Quat.toArray(this.editorCamera.transform.rotation),
// // //             scale: Vec3.toArray(this.editorCamera.transform.scale),
// // //             fieldOfView: this.editorCamera.fieldOfView,
// // //             nearPlane: this.editorCamera.nearPlane,
// // //             farPlane: this.editorCamera.farPlane,
// // //             aspectRatio: this.editorCamera.aspectRatio
// // //         };
// // //         localStorage.setItem('cameraData', JSON.stringify(cameraData));
// // //         // console.log("Câmera salva com sucesso.");
// // //     }
// // // }

// // // public restoreCamera() {
// // //     const savedData = localStorage.getItem('cameraData');
// // //     if (savedData) {
// // //         const cameraData = JSON.parse(savedData);
// // //         this.editorCamera.transform.position = Vec3.fromArray(cameraData.position);
// // //         this.editorCamera.transform.rotation = Quat.fromArray(cameraData.rotation);
// // //         this.editorCamera.transform.scale = Vec3.fromArray(cameraData.scale);
// // //         this.editorCamera.fieldOfView = cameraData.fieldOfView;
// // //         this.editorCamera.nearPlane = cameraData.nearPlane;
// // //         this.editorCamera.farPlane = cameraData.farPlane;
// // //         this.editorCamera.aspectRatio = cameraData.aspectRatio;
// // //         // console.log("Câmera restaurada com sucesso.");
// // //     }
// // // }




// // // Exemplo de uso
// import EngineCache from "../Cache/EngineCache";
// import Camera from "../Core/Inplementations/Camera";
// import Material from "../Core/Inplementations/Material";
// import Shader3D from "../../Shader/Shader";
// import Transform from "../Core/Inplementations/Transform";

// // import Grid, { MeshRenderer } from "./Grid";
// import Mat4 from "../Core/Math/Mat4";


// class Editor {
//     camera: Camera = new Camera();
    
//     constructor() {
//         this.camera.farPlane = 10000;
//     }
// }

// export default class WebGLLink {
//     public editor: Editor = new Editor(); 
//     public gl: WebGLRenderingContext | null = null;
//     public defaultCamera: Camera = new Camera();
//     public transform: Transform = new Transform();
//     public material2D: Material = new Material();
    
//     constructor(canvas: HTMLCanvasElement) {
//         this.gl = canvas.getContext("webgl2") || canvas.getContext("webgl");

//         if (!this.gl) {
//             console.error("O contexto WebGL não está disponível.");
//             return;
//         }
//         EngineCache.gl = this.gl;
        
//     }

//     private setUniforms(gl: WebGLRenderingContext, program: WebGLProgram) {
//         if (gl && program) {
//             const translation = Mat4.translate(this.transform.position);
//             this.material2D.shader.send<Mat4>(gl, "u_translation", translation);

//             const rotation = Mat4.rotate(this.transform.rotation);
//             this.material2D.shader.send<Mat4>(gl, "u_rotation", rotation);

//             const scale = Mat4.scale(this.transform.scale);
//             this.material2D.shader.send<Mat4>(gl, "u_scale", scale);

//             const view = this.editor.camera.getViewMatrix();
//             this.material2D.shader.send<Mat4>(gl, "u_view", view);

//             const projection = this.defaultCamera.getProjectionMatrix();
//             this.material2D.shader.send<Mat4>(gl, "u_projection", projection);

            
//         }
//     }

//     private gridVertices() {
//         const vertices: number[] = [];
//         const colors: number[] = [];

//         const baseWidth = 100;
//         const baseHeight = 100;
//         const baseCellSize = 1;
//         const initialDivisions = 10;
//         const maxSubdivisions = 5; // Limite máximo de subdivisões

//         const cameraPosition = this.editor.camera.transform.position;

//         const drawInfiniteGrid = (baseWidth: number, baseHeight: number, baseCellSize: number, divisions: number, subdivisions: number) => {
//             const distanceY = Math.abs(cameraPosition.y);

//             // Calcula o fator de escala com base na altura da câmera
//             const scaleFactor = Math.pow(2, Math.min(subdivisions, Math.floor(distanceY / 10)));
//             const cellSize = baseCellSize * scaleFactor;

//             const totalWidth = baseWidth * cellSize;
//             const totalHeight = baseHeight * cellSize;

//             const stepX = totalWidth / divisions;
//             const stepZ = totalHeight / divisions;

//             const startX = Math.floor(cameraPosition.x / stepX) * stepX - totalWidth / 2;
//             const endX = Math.floor(cameraPosition.x / stepX) * stepX + totalWidth / 2;
//             const startZ = Math.floor(cameraPosition.z / stepZ) * stepZ - totalHeight / 2;
//             const endZ = Math.floor(cameraPosition.z / stepZ) * stepZ + totalHeight / 2;

//             for (let x = startX; x <= endX; x += stepX) {
//                 vertices.push(x, 0, startZ);
//                 vertices.push(x, 0, endZ);
//                 colors.push(1, 1, 1, 1);
//                 colors.push(1, 1, 1, 1);
//             }

//             for (let z = startZ; z <= endZ; z += stepZ) {
//                 vertices.push(startX, 0, z);
//                 vertices.push(endX, 0, z);
//                 colors.push(1, 1, 1, 1);
//                 colors.push(1, 1, 1, 1);
//             }
//         };

//         // Limite as subdivisões para evitar sobrecarga
//         for (let i = 0; i < maxSubdivisions; i++) {
//             drawInfiniteGrid(baseWidth, baseHeight, baseCellSize, initialDivisions, i);
//         }

//         return { vertices, colors };
//     }

//     // public drawGrid(direction: "X" | "Y" | "Z") {
//     //     const { vertices, colors } = this.gridVertices();

//     //     this.check2D((gl, program) => {
//     //         // Criação e configuração do buffer de vértices
//     //         const vertexBuffer = gl.createBuffer();
//     //         gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

//     //         // Criação e configuração do buffer de cores
//     //         const colorBuffer = gl.createBuffer();
//     //         gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//     //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

//     //         gl.useProgram(program);

//     //         // Configuração do atributo de posição
//     //         const positionLocation = Shader.getAttributeLocation(gl, program, "a_position");
//     //         gl.enableVertexAttribArray(positionLocation);
//     //         gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     //         gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

//     //         // Configuração do atributo de cor
//     //         const colorLocation = Shader.getAttributeLocation(gl, program, "a_color");
//     //         gl.enableVertexAttribArray(colorLocation);
//     //         gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//     //         gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

//     //         this.setUniforms(gl, program);

//     //         // Configurações de blend
//     //         gl.enable(gl.BLEND);
//     //         gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

//     //         // Desativa o teste de profundidade
//     //         gl.disable(gl.DEPTH_TEST);

//     //         // Desenha os vértices
//     //         gl.drawArrays(gl.LINES, 0, vertices.length / 3);

//     //         // Limpeza
//     //         gl.bindBuffer(gl.ARRAY_BUFFER, null);
//     //         gl.deleteBuffer(vertexBuffer);
//     //         gl.deleteBuffer(colorBuffer);
//     //     });
//     // }

//     public check2D(callback: (gl: WebGLRenderingContext, shaderProgram: WebGLProgram) => void): void {
//         const shaderProgram = this.material2D.shader.program;
//         const gl = this.gl;

//         if (!gl || !shaderProgram) {
//             return;
//         }

//         callback(gl, shaderProgram);
//     }
// }
