import Camera from "./Core/Inplementations/Camera";

export default class CameraManager {

    constructor(camera: Camera) {
        this.initializeControls(camera);
    }

    private initializeControls(camera: Camera) {
        // Obtém referências aos elementos dos controles
        const fovInput = document.getElementById('fov') as HTMLInputElement;
        const fovValue = document.getElementById('fovValue') as HTMLSpanElement;
    
        const nearInput = document.getElementById('near') as HTMLInputElement;
        const nearValue = document.getElementById('nearValue') as HTMLSpanElement;
    
        const farInput = document.getElementById('far') as HTMLInputElement;
        const farValue = document.getElementById('farValue') as HTMLSpanElement;
    
        const initialFov = camera.getFov();  // Ajuste o método da sua classe Camera
        const initialNear = camera.getNear();  // Ajuste o método da sua classe Camera
        const initialFar = camera.getFar();  // Ajuste o método da sua classe Camera
    
        // Atualiza os valores dos inputs e dos elementos de exibição
        fovInput.value = initialFov.toFixed(2);
        fovValue.textContent = fovInput.value;
    
        nearInput.value = initialNear.toFixed(2);
        nearValue.textContent = nearInput.value;
    
        farInput.value = initialFar.toFixed(2);
        farValue.textContent = farInput.value;
    
        // Adiciona ouvintes de evento para atualizar a câmera quando o valor mudar
        fovInput.addEventListener('input', () => {
            const fov = parseFloat(fovInput.value);
            fovValue.textContent = fov.toFixed(2);
            camera.setFov(fov);  // Ajuste o método da sua classe Camera
        });
    
        nearInput.addEventListener('input', () => {
            const near = parseFloat(nearInput.value);
            nearValue.textContent = near.toFixed(2);
            camera.setNear(near);  // Ajuste o método da sua classe Camera
        });
    
        farInput.addEventListener('input', () => {
            const far = parseFloat(farInput.value);
            farValue.textContent = far.toFixed(2);
            camera.setFar(far);  // Ajuste o método da sua classe Camera
        });
    }
    
}