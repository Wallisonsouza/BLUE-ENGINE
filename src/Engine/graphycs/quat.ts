
import Mathf from "../static/Mathf";
import Vec3 from "./vec3";

export default class Quat{
    public x: number;
    public y: number;
    public z: number;
    public w: number;

    public static readonly identity = new Quat(0, 0, 0, 1)
    public static readonly zero = new Quat(0, 0, 0, 0)

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public static toQuat(vector: Vec3): Quat {
        // Convertendo ângulos de graus para radianos
        const rollRad = Mathf.degToRad(vector.x) * 0.5;
        const pitchRad = Mathf.degToRad(vector.y) * 0.5;
        const yawRad = Mathf.degToRad(vector.z) * 0.5;
    
        // Calculando os senos e cossenos
        const sinRoll = Mathf.sin(rollRad);
        const cosRoll = Mathf.cos(rollRad);
        const sinPitch = Mathf.sin(pitchRad);
        const cosPitch = Mathf.cos(pitchRad);
        const sinYaw = Mathf.sin(yawRad);
        const cosYaw = Mathf.cos(yawRad);
    
        // Calculando os componentes do quaternion
        const x = cosPitch * sinRoll * cosYaw - cosRoll * sinPitch * sinYaw;
        const y = cosRoll * sinPitch * cosYaw + sinRoll * cosPitch * sinYaw;
        const z = cosRoll * cosPitch * sinYaw - sinRoll * sinPitch * cosYaw;
        const w = cosRoll * cosPitch * cosYaw + sinRoll * sinPitch * sinYaw;
    
        // Retornando o quaternion
        return new Quat(x, y, z, w);
    }
    public static slerp(a: Quat, b: Quat, t: number): Quat {
        let dot = Quat.dot(a, b);

        // If the dot product is negative, reverse one quaternion to take the shorter path
        if (dot < 0.0) {
            b = Quat.negate(b);
            dot = -dot;
        }

        const DOT_THRESHOLD = 0.9995;
        if (dot > DOT_THRESHOLD) {
            const result = Quat.add(a, Quat.multiplyScalar(Quat.subtract(b, a), t));
            return Quat.normalize(result);
        }

        dot = Mathf.clamp(dot, -1.0, 1.0);
        const theta_0 = Mathf.acos(dot);
        const theta = theta_0 * t;
        const relative = Quat.normalize(Quat.subtract(b, Quat.multiplyScalar(a, dot)));

        return Quat.add(Quat.multiplyScalar(a, Mathf.cos(theta)), Quat.multiplyScalar(relative, Mathf.sin(theta)));
    }

    public static dot(a: Quat, b: Quat): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }

    public static normalize(q: Quat): Quat {
        const length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
        return new Quat(q.x / length, q.y / length, q.z / length, q.w / length);
    }

    public static add(a: Quat, b: Quat): Quat {
        return new Quat(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    public static subtract(a: Quat, b: Quat): Quat {
        return new Quat(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    public static multiplyScalar(q: Quat, s: number): Quat {
        return new Quat(q.x * s, q.y * s, q.z * s, q.w * s);
    }

    public static negate(q: Quat): Quat {
        return new Quat(-q.x, -q.y, -q.z, -q.w);
    }
    static multiplyVec3(quaternion: Quat, vector: Vec3): Vec3 {
        const num00 = quaternion.x * 2;
        const num01 = quaternion.y * 2;
        const num03 = quaternion.z * 2;
        const num04 = quaternion.x * num00;
        const num05 = quaternion.y * num01;
        const num06 = quaternion.z * num03;
        const num07 = quaternion.x * num01;
        const num08 = quaternion.x * num03;
        const num09 = quaternion.y * num03;
        const num10 = quaternion.w * num00;
        const num11 = quaternion.w * num01;
        const num12 = quaternion.w * num03;

        const right = new Vec3(
            1 - (num05 + num06),
            num07 - num12,
            num08 + num11
        );

        const up = new Vec3(
            num07 + num12,
            1 - (num04 + num06),
            num09 - num10
        );

        const forward = new Vec3(
            num08 - num11,
            num09 + num10,
            1 - (num04 + num05)
        );

        return new Vec3(
            Vec3.dot(vector, right),
            Vec3.dot(vector, up),
            Vec3.dot(vector, forward)
        );
    }
}