// import Component from "../engine/base_component";
// import BaseObject from "../engine/Entity";
// import List from "./List";
// import Rect from "./Rect";

// /**
//  * Classe que representa um GameObject.
//  * @extends {BaseObject}
//  * @implements {IGameObject}
//  * @class
//  * @public
//  * @example
//  * const gameObject = new GameObject("Player");
//  */
// export default class GameObject extends BaseObject {
    
//     public layer: number;
//     public active: boolean;
//     public tag: string;
//     public name: string;
//     private components: List<Component>;
//     public rect: Rect; 

//     constructor(name?: string, tag?: string, layer?: number, rect?: Rect, active?: boolean) {
//         super();

//         this.components = new List<Component>();

//         name ? this.name = name : this.name = `GameObject`;
//         tag ? this.tag = tag : this.tag = "Untagged";
//         layer ? this.layer = layer : this.layer = 0;
//         active ? this.active = active : this.active = true;

//         const rec = this.rect = new Rect();
//         rec.gameObject = this;
//         rect ? this.rect = rect : rec;
    
//     }

//     /**
//      *  Adiciona um componente a lista de componentes do GameObject.
//      * @param componentInstance - A instância do componente a ser adicionado. 
//      */
//     public addComponentInstance(componentInstance: Component): void {
//         if(!this.components.contains(componentInstance)) {

//             componentInstance.gameObject = this;

//             this.components.add(componentInstance);
//         }
//     }

//     /**
//      * Adiciona uma lista de componentes a lista de componentes do GameObject.
//      * @param componentInstances - A lista de instâncias de componentes a serem adicionadas.
//      */
//     public addComponentInstances(componentInstances: List<Component>): void {
//         this.components.addListRange(componentInstances);
//     }

//     /**
//      * Adiciona um componente ao GameObject.
//      * @param type - O tipo do componente a ser adicionado.
//      * @returns A instância do componente adicionado
//      */
//     public addComponent<T extends Component>(type: new () => T): T {
//         const component = new type();
//         this.addComponentInstance(component);
//         return component;
//     }

//     /**
//      * Adiciona uma lista de componentes ao GameObject.
//      * @param types - A lista de tipos de componentes a serem adicionados.
//      * @returns A lista de instâncias de componentes adicionadas.
//      */
//     public addComponents<T extends Component>(types: (new () => T)[]): T[] {
//         const components = types.map((type) => new type());
//         this.addComponentInstances(List.fromArray(components));
//         return components;
//     }
    
//     /**
//      * Retorna um componente do tipo especificado.
//      * @param type - O tipo do componente a ser retornado.
//      * @returns O componente do tipo especificado ou null se não encontrado.
//      */
//     public getComponent<T extends Component>(type: new () => T): T | null {
//         return this.components.findFirst((component) => component instanceof type) as T;
//     }

//     /**
//      * Retorna todos os componentes do tipo especificado.
//      * @param type - O tipo do componente a ser retornado.
//      * @returns Uma lista de componentes do tipo especificado.
//      */
//     public getComponents<T extends Component>(type: new () => T): List<T> {
//         return this.components.findAll((component) => component instanceof type) as List<T>;
//     }

//     /**
//      * Remove um componente do GameObject.
//      * @param type - O tipo do componente a ser removido.
//      */
//     public removeComponent<T extends Component>(type: new () => T): void {
//         this.components.removeFirst((component) => component instanceof type);
        
//     }

//     /**
//      * Remove todos os componentes do tipo especificado.
//      * @param type - O tipo dos componentes a serem removidos.
//      */
//     public removeComponents<T extends Component>(type: new () => T): void {
//         this.components.removeAll((component) => component instanceof type);
//     }

//     public hasComponent<T extends Component>(type: new () => T): boolean {
//         return this.components.findFirst((component) => component instanceof type) !== undefined;
//     }

//     public toString(): string {
//         return `
//             GameObject: ${this.name}
//             Layer: ${this.layer}
//             Active: ${this.active}
//             Tag: ${this.tag}
//         `;
//     }
// }
