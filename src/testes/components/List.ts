export default class List<T> {
    private _items: T[] = [];

    constructor(items?: T[] | List<T>) {
        if (Array.isArray(items)) {
            this._items = [...items];
        } else if (items instanceof List) {
            this._items = items.toArray();
        }
    }

    public add(item: T): void {
        if (item !== null && item !== undefined) {
            this._items.push(item);
        }
    }

    public addArrayRange(items: T[]): void {
        const filteredItems = items.filter(item => item !== null && item !== undefined);
        this._items.push(...filteredItems);
    }

    public addListRange(items: List<T>): void {
        this.addArrayRange(items.toArray());
    }

    public remove(item: T): boolean {
        const index = this._items.indexOf(item);
        if (index !== -1) {
            this._items.splice(index, 1);
            return true;
        }
        return false;
    }

    public clear(): void {
        this._items = [];
    }

    public get count(): number {
        return this._items.length;
    }

    public indexOf(item: T): number {
        return this._items.indexOf(item);
    }

    public forEach(callback: (item: T, index: number) => void): void {
        this._items.forEach(callback);
    }

    public toArray(): T[] {
        return [...this._items];
    }

    public contains(item: T): boolean {
        return this._items.includes(item);
    }

    public get(index: number): T | undefined {
        if (index < 0 || index >= this._items.length) {
            throw new Error("Índice inválido");
        }
        return this._items[index];
    }

    public sort(compareFn: (a: T, b: T) => number) {
       return this._items.sort(compareFn);
    }

    public set(index: number, item: T): boolean {
        if (index < 0 || index >= this._items.length || item === null || item === undefined) {
            throw new Error("Índice inválido ou item nulo");
        }
        this._items[index] = item;
        return true;
    }

    public findFirst(callback: (item: T) => boolean): T | undefined {
        return this._items.find(callback);
    }

    public findAll(callback: (item: T) => boolean): List<T> {
        return List.fromArray(this._items.filter(callback));
    }

    public removeFirst(callback: (item: T) => boolean): boolean {
        const index = this._items.findIndex(callback);
        if (index !== -1) {
            this._items.splice(index, 1);
            return true;
        }
        return false;
    }

    public removeAll(callback: (item: T) => boolean): number {
        const originalLength = this._items.length;
        this._items = this._items.filter(item => !callback(item));
        return originalLength - this._items.length;
    }

    public toString(): string {
        return `[${this._items.join(", ")}]`;
    }

    public concat(list: List<T>): List<T> {
        return new List<T>([...this._items, ...list.toArray()]);
    }

    public isEmpty(): boolean {
        return this._items.length === 0;
    }

    
    public static fromArray<T>(array: T[]): List<T> {
        return new List<T>(array);
    }

    public static empty<T>(): List<T> {
        return new List<T>();
    }

    public static sort<T>(list: List<T>, compareFn: (a: T, b: T) => number): List<T> {
        return new List<T>([...list.toArray()].sort(compareFn));
    }
    
}