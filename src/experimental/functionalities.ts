// import Vector2 from "../vector2";


// export default class Functionalities {

//     public static move(element: HTMLElement, translation: Vector2, speed: number) {
        
//         const currentX = element.offsetLeft;
//         const currentY = element.offsetTop;
    
//         const newX = currentX + translation.x * speed;
//         const newY = currentY + translation.y * speed;
      
//         element.style.left = `${newX}px`;
//         element.style.top = `${newY}px`;
//     }
   
//     public static getDirection(element: HTMLElement, direction: Vector2) {
//         const style = window.getComputedStyle(element);
//         const transform = style.transform;
    
//         if (transform !== 'none') {
//             const values = transform.split('(')[1].split(')')[0].split(',');
//             const a = parseFloat(values[0]);
//             const b = parseFloat(values[1]);
//             const angleInRadians = Math.atan2(b, a);
    
//             const x = direction.x;
//             const y = direction.y;
    
//             const sin = Math.sin(angleInRadians);
//             const cos = Math.cos(angleInRadians);
    
//             const newX = x * cos - y * sin;
//             const newY = x * sin + y * cos;
    
//             return new Vector2(newX, newY);
//         }
    
//         return direction;
//     }
    
//     public static moveDirection(element: HTMLElement, direction: Vector2, value: number, speed: number) {
     
//         const currentX =  element.offsetLeft;
//         const currentY =  element.offsetTop;

//         const deltaX = direction.x * value * speed;
//         const deltaY = direction.y * value * speed;


//         const newX = currentX + deltaX;
//         const newY = currentY + deltaY;

//         element.style.left = `${Math.round(newX)}px`;
//         element.style.top = `${Math.round(newY)}px`;
//     }

//     public static getRotation(element: HTMLElement) {
//         const style = window.getComputedStyle(element);
//         const transform = style.transform;
    
//         if (transform !== 'none') {
//             const values = transform.split('(')[1].split(')')[0].split(',');
//             const a = parseFloat(values[0]);
//             const b = parseFloat(values[1]);
//             return Math.atan2(b, a);
//         }
    
//         return 0;
//     }

//     public static getRotationRad(element: HTMLElement) {
//         return this.getRotation(element);
//     }

//     public static getRotationDeg(element: HTMLElement) {

//         const rad = this.getRotation(element);
//         return EngineMath.radToDeg(rad);
//     }

//     public static setRotationDeg(element: HTMLElement, angle: number) {
//         element.style.transform = `rotate(${angle}deg)`;
//     }

//     public static setRotationRad(element: HTMLElement, angle: number) {
//         element.style.transform = `rotate(${angle}rad)`;
//     }

//     public static rotateDeg(element: HTMLElement, angle: number) {
//         const currentAngle = this.getRotationDeg(element);
//         this.setRotationDeg(element, currentAngle + angle);
//     }



// }