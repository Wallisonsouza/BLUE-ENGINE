import Mathf from "./Mathf";
import Quat from "./Quat";
import Vec3 from "./Vec3";

export default class Mat4 {
    private _data: Float32Array;

    constructor(
        m00: number, m01: number, m02: number, m03: number,
        m10: number, m11: number, m12: number, m13: number,
        m20: number, m21: number, m22: number, m23: number,
        m30: number, m31: number, m32: number, m33: number
    ) {
        this._data = new Float32Array([
            m00, m01, m02, m03,
            m10, m11, m12, m13,
            m20, m21, m22, m23,
            m30, m31, m32, m33
        ]);
    }

    public static identity(): Mat4 {
        return new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    public clone(): Mat4 {
        return new Mat4(
            this._data[0], this._data[1], this._data[2], this._data[3],
            this._data[4], this._data[5], this._data[6], this._data[7],
            this._data[8], this._data[9], this._data[10], this._data[11],
            this._data[12], this._data[13], this._data[14], this._data[15]
        );
    }

    public removeTranslation(): Mat4 {
       
        const clonedMatrix = this.clone();
        clonedMatrix._data[12] = 0; // Translação em x
        clonedMatrix._data[13] = 0; // Translação em y
        clonedMatrix._data[14] = 0; // Translação em z
        return clonedMatrix;
    }

    public static translate(t: Vec3): Mat4 {
        return new Mat4(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            t.x, t.y, t.z, 1
        );
    }

    public static shadowMapping(projectionMatrix: Mat4, viewMatrix: Mat4) {
        return Mat4.multiply(projectionMatrix, viewMatrix);
    }

    public static rotate(rotation: Quat): Mat4 {
        const xx = rotation.x * 2;
        const yy = rotation.y * 2;
        const zz = rotation.z * 2;
        const x_xx = rotation.x * xx;
        const y_yy = rotation.y * yy;
        const z_zz = rotation.z * zz;
        const x_yy = rotation.x * yy;
        const x_zz = rotation.x * zz;
        const y_zz = rotation.y * zz;
        const w_xx = rotation.w * xx;
        const w_yy = rotation.w * yy;
        const w_zz = rotation.w * zz;
    
        return new Mat4(
            1 - (y_yy + z_zz), x_yy + w_zz, x_zz - w_yy, 0,
            x_yy - w_zz, 1 - (x_xx + z_zz), y_zz + w_xx, 0,
            x_zz + w_yy, y_zz - w_xx, 1 - (x_xx + y_yy), 0,
            0, 0, 0, 1
        );
    }

    public static scale(s: Vec3){
        return new Mat4(
            s.x, 0, 0, 0,
            0, s.y, 0, 0,
            0, 0, s.z, 0,
            0, 0, 0, 1
        );
    }

    public static model(translation: Vec3, rotation: Quat, scale: Vec3): Mat4 {
        // Calcula os componentes de rotação
        const xx = rotation.x * 2;
        const yy = rotation.y * 2;
        const zz = rotation.z * 2;
        const x_xx = rotation.x * xx;
        const y_yy = rotation.y * yy;
        const z_zz = rotation.z * zz;
        const x_yy = rotation.x * yy;
        const x_zz = rotation.x * zz;
        const y_zz = rotation.y * zz;
        const w_xx = rotation.w * xx;
        const w_yy = rotation.w * yy;
        const w_zz = rotation.w * zz;
    
        // Monta a matriz composta de uma vez
        return new Mat4(
            (1 - (y_yy + z_zz)) * scale.x, (x_yy + w_zz) * scale.y, (x_zz - w_yy) * scale.z, 0,
            (x_yy - w_zz) * scale.x, (1 - (x_xx + z_zz)) * scale.y, (y_zz + w_xx) * scale.z, 0,
            (x_zz + w_yy) * scale.x, (y_zz - w_xx) * scale.y, (1 - (x_xx + y_yy)) * scale.z, 0,
            translation.x, translation.y, translation.z, 1
        );
    }
    
    public static lookTo(position: Vec3, direction: Vec3, up: Vec3): Mat4 {
    
        const zAxis = Vec3.normalize(direction.negative());
        const xAxis = Vec3.normalize(Vec3.cross(up, zAxis));
        const yAxis = Vec3.normalize(Vec3.cross(zAxis, xAxis));
    
        const lookToMatrix = new Mat4(
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
            -Vec3.dot(xAxis, position), -Vec3.dot(yAxis, position), -Vec3.dot(zAxis, position), 1
        );
    
        return lookToMatrix;
    }

    public static perspective(fov: number, aspectRatio: number, nearPlane: number, farPlane: number): Mat4 {
        const tanHalfFov = Mathf.tan(Mathf.degToRad(fov) / 2);
        const range = farPlane - nearPlane;
   
        return new Mat4(
            1 / (aspectRatio * tanHalfFov), 0, 0, 0,
            0, 1 / tanHalfFov, 0, 0,
            0, 0, -(farPlane + nearPlane) / range, -1,
            0, 0, -2 * (farPlane * nearPlane) / range, 0
        );
    }

    public static orthographic(left: number, right: number, bottom: number, top: number, nearPlane: number, farPlane: number): Mat4 {
        const width = right - left;
        const height = top - bottom;
        const depth = farPlane - nearPlane;

        return new Mat4(
            2 / width, 0, 0, 0,
            0, 2 / height, 0, 0,
            0, 0, -2 / depth, 0,
            - (right + left) / width, - (top + bottom) / height, - (farPlane + nearPlane) / depth, 1
        );
    }
    
    public static multiply(lhs: Mat4, rhs: Mat4): Mat4 {
        const result = Mat4.identity();
        const a = lhs.getData();
        const b = rhs.getData();
        const r = result.getData();
    
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                r[i * 4 + j] = a[i * 4] * b[j] +
                               a[i * 4 + 1] * b[j + 4] +
                               a[i * 4 + 2] * b[j + 8] +
                               a[i * 4 + 3] * b[j + 12];
            }
        }
    
        return result;
    }

    public getData(): Float32Array {
        return this._data;
    }

    public toString(): string {
        const data = this.getData();
        let result = '';

        for (let i = 0; i < 4; i++) {
            result += `[${data[i * 4].toFixed(2)}, ${data[i * 4 + 1].toFixed(2)}, ${data[i * 4 + 2].toFixed(2)}, ${data[i * 4 + 3].toFixed(2)}]\n`;
        }
        return result;
    }
}
