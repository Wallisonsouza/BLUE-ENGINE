export class ErrorContext {
    constructor(
        public readonly module: string,
        public readonly className: string,
        public readonly methodName: string
    ) {}

    public static fromClassAndMethod(cls: Object, methodName: string): ErrorContext {
        return new ErrorContext(cls.constructor.name, methodName, methodName);
    }
}