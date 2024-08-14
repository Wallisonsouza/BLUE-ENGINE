 precision highp float;
attribute vec3 a_position;
uniform mat4 u_translation;
uniform mat4 u_rotation;  
uniform mat4 u_scale;    

uniform mat4 u_projection;
uniform mat4 u_view;   

void main() {

    //scale * rotation * translation
    mat4 trs = u_translation * u_rotation * u_scale;

    // o modelo e o resultado da multiplicacao das matrizes de tranformaçao com os vertices
    vec4 model = trs * vec4(a_position, 1.0);
    vec4 mvp = u_projection * u_view * model;
    gl_Position = mvp;
}