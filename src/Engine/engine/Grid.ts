// import EngineCache from "../Cache/EngineCache";
// import Material from "../Core/Inplementations/Material";
// import Shader3D from "../Core/Inplementations/Shader";
// import Transform from "../Core/Inplementations/Transform";
// import MeshAuthor from "../graphycs/Mesh";

// export default class Grid extends Scrypt {

//     public size1: number = 10;
//     public size2: number = 100;
//     public distance: number = 8000;
//     public mesh: Mesh = new Mesh();

//     constructor() {
//         super()
   
//         const shader = new Shader();
//         shader.vertSource = `
//         precision highp float;
//         attribute vec3 a_position;
//         attribute vec4 a_color;
      
//         uniform mat4 u_translation;
//         uniform mat4 u_projection;
//         uniform mat4 u_rotation;  
//         uniform mat4 u_scale;    
//         uniform mat4 u_view;   

        
//        varying vec4 v_color;

//         void main() {
//             mat4 trs = u_translation * u_rotation * u_scale;
//             vec4 model = trs * vec4(a_position, 1.0);
//             vec4 mvp = u_projection * u_view * model;
//             gl_Position = mvp;

//             v_color = a_color;
//         }
//         `
//         shader.fragSource = `
//         precision highp float;
//         varying vec4 v_color;
        
//         void main() {
//             gl_FragColor = v_color;
//         }
//         `
//         shader.compile();
       
//         this.mesh.material.shader = shader;
//     }
// }

