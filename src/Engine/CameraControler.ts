import Camera from "./Core/Inplementations/Camera";
import Mathf from "./Core/Math/Mathf";
import Quat from "./Core/Math/Quat";
import Vec3 from "./Core/Math/Vec3";
import { KeyCode } from "./Enum/KeyCode";
import Input from "./Input/Input";
import Time from "./static/Time";

export default class CameraController {
    
    private targetPosition: Vec3 = new Vec3(0, 0, 10);
    private cameraRotation: Vec3 = Vec3.zero;
    private rotationSpeed: number = 0.1;
    private smoothingFactor: number = 20;

    private speed = 1;
    private maxSpeed = 2;
    private minSpeed = 0.02;
    public maxLerpFactor = 1;
    public minLerpFactor = 2;

    aceleration: boolean = true;
 

    public update(camera: Camera): void {
        this.handleInput(camera, Time.deltaTime);
        this.smoothMovement(camera, Time.deltaTime);
        this.smoothRotation(camera, Time.deltaTime);
        this.toogleCamera();
    }

    private handleInput(camera: Camera, deltaTime: number): void {
        if (Input.getMouseButton(2)) {
            const delta = Input.getMouseMovement();
            this.cameraRotation.y -= delta.x * this.rotationSpeed;
            this.cameraRotation.x -= delta.y * this.rotationSpeed;
        }

        let movement = Vec3.zero;

        if(Input.getKey(KeyCode.W) || Input.getKey(KeyCode.S) || Input.getKey(KeyCode.A) || Input.getKey(KeyCode.D)) {
            
            if (this.aceleration) {
                this.speed = Mathf.lerp(this.speed, this.maxSpeed, Time.deltaTime * this.maxLerpFactor);
            } else {
                this.speed = this.maxSpeed;
            }

            if (Input.getKey(KeyCode.W)) {
                movement = camera.transform.getBackwardDirection();
            }
            if (Input.getKey(KeyCode.S)) {
                movement = camera.transform.getForwardDirection();
            }
            if (Input.getKey(KeyCode.D)) {
                movement = camera.transform.getRightDirection();
            }
            if (Input.getKey(KeyCode.A)) {
                movement = camera.transform.getLeftDirection();
               
            }
        } else {
            this.speed = Mathf.lerp(this.speed, this.minSpeed, Time.deltaTime * this.minLerpFactor);
        }
       
        if (!movement.equals(Vec3.zero)) {
            movement = movement.normalize().scale(this.speed * 100 * Time.deltaTime);
            this.targetPosition = camera.transform.position.add(movement);
        }
    }

    private smoothMovement(camera: Camera, deltaTime: number): void {
        const currentPosition = camera.transform.position;
        const newPosition = Vec3.lerp(currentPosition, this.targetPosition, this.smoothingFactor * deltaTime);
        camera.transform.position = newPosition;
    }

    private smoothRotation(camera: Camera, deltaTime: number): void {
        if (this.cameraRotation.equals(Vec3.zero)) return;

        const oldRotation = camera.transform.rotation;
        const rotation = Quat.fromEulerAngles(this.cameraRotation);
        const newRotation = Quat.slerp(oldRotation, rotation, this.smoothingFactor * deltaTime);
        camera.transform.rotation = newRotation;
         camera.transform.rotation = newRotation;
    }


    private gameCamera = Camera.gameCamera;
    private editorCamera = Camera.editorCamera;
    private currentCamera: Camera = this.editorCamera;

    private toogleCamera() {
        if (Input.getKeyDown(KeyCode.C)) {
            // Alterna entre as câmeras
            if (this.currentCamera === this.gameCamera) {
                this.currentCamera = this.editorCamera;
            } else {
                this.currentCamera = this.gameCamera;
            }

            Camera.currentCamera = this.currentCamera;
        }
    }


}