import Input from "../testes/static/input";

export default class Resize {

    public static moveInDirectionOfRotation(element: HTMLElement, speed: number) {
        const style = window.getComputedStyle(element);
        const transform = style.transform;
    
        if (transform !== 'none') {
            // Extrair a matriz de transformação do estilo transform
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            const angleInRadians = Math.atan2(b, a);
    
            // Calcular os deslocamentos horizontais e verticais
            const deltaX = speed * Math.cos(angleInRadians);
            const deltaY = speed * Math.sin(angleInRadians);
    
            // Obter as posições atuais do elemento
            const currentLeft = parseFloat(element.style.left || '0');
            const currentTop = parseFloat(element.style.top || '0');
    
            // Incrementar as posições atuais com os deslocamentos
            const newLeft = currentLeft + deltaX;
            const newTop = currentTop + deltaY;
    
            // Atualizar as posições do elemento
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        }
    }
   
    public static resizeLeftElement(element: HTMLElement) {
        element.style.width = `${parseFloat(window.getComputedStyle(element).width) - Input.scaledMouseMovement.x}px`;
        element.style.left = `${parseFloat(window.getComputedStyle(element).left) + Input.scaledMouseMovement.x}px`;
    }

    public static resizeRightElement(element: HTMLElement) {
        element.style.width = `${parseFloat(window.getComputedStyle(element).width) + Input.scaledMouseMovement.x}px`;
        element.style.left = `${parseFloat(window.getComputedStyle(element).left)}px`;
    }

    public static resizeTopElement(element: HTMLElement) {
        const newHeight = parseFloat(window.getComputedStyle(element).height) - Input.scaledMouseMovement.y;
        const newTop = parseFloat(window.getComputedStyle(element).top) + Input.scaledMouseMovement.y;
        element.style.height = `${newHeight}px`;
        element.style.top = `${newTop}px`;
    }

    public static resizeBottomElement(element: HTMLElement) {
        const newHeight = parseFloat(window.getComputedStyle(element).height) + Input.scaledMouseMovement.y;
        const newTop = parseFloat(window.getComputedStyle(element).top);
        element.style.height = `${newHeight}px`;
        element.style.top = `${newTop}px`;
    }
}

export class ElementFuncionality {

    public static moveInDirectionOfRotation(element: HTMLElement, speed: number) {
        const style = window.getComputedStyle(element);
        const transform = style.transform;
    
        if (transform !== 'none') {
            // A matriz de transformação é uma string no formato "matrix(a, b, c, d, e, f)"
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            const angleInRadians = Math.atan2(b, a);
    
            // Calcular os deslocamentos horizontais e verticais
            const deltaX = speed * Math.cos(angleInRadians);
            const deltaY = speed * Math.sin(angleInRadians);
    
    
            element.style.left = `${deltaX}px`;
            element.style.top = `${deltaY}px`;
        }
    }

    public static moveElement(element: HTMLElement, event: MouseEvent) {
            
        const rect = element.getBoundingClientRect();

        const zoomLevel = window.devicePixelRatio;
        const scaledMovementX = event.movementX / zoomLevel;
        const scaledMovementY = event.movementY / zoomLevel;

        const left = rect.left;
        const top = rect.top;

        const newLeft = left + scaledMovementX;
        const newTop = top + scaledMovementY;

        element.style.left = `${newLeft}px`;
        element.style.top = `${newTop}px`;
    }

    public static rotateElement(element: HTMLElement, event: MouseEvent) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * (180 / Math.PI);
    
        element.style.transform = `rotate(${angle}deg)`;
    }

    public static getRotationAngle(element: HTMLElement) {
        const style = window.getComputedStyle(element);
        const transform = style.transform;

        if (transform !== 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            return Math.atan2(b, a) * (180 / Math.PI);
        }

        return 0;
    }

    public static moveLeftDirection(element: HTMLElement, left: number) {
        const style = window.getComputedStyle(element);
        const transform = style.transform;
    
        if (transform !== 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            const angleInRadians = Math.atan2(b, a);
    
            const deltaX = left * Math.cos(angleInRadians);
            const deltaY = left * Math.sin(angleInRadians);
    
            const currentLeft = parseFloat(style.left);
            const currentTop = parseFloat(style.top);
    
            const newLeft = currentLeft + deltaX;
            const newTop = currentTop + deltaY;
    
            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
        } 
    }
}

