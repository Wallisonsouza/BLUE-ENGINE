export class AppError extends Error {
    public readonly module: string;
    public readonly className: string;
    public readonly methodName: string;
    public readonly details?: string;

    constructor({
        module,
        className,
        methodName,
        message,
        details,
    }: {
        module: string;
        className: string;
        methodName: string;
        message: string;
        details?: string;
    }) {
        super(AppError.buildMessage(module, className, methodName, message, details));

        this.module = module;
        this.className = className;
        this.methodName = methodName;
        this.details = details;
        this.name = 'AppError';
     
    }

    private static buildMessage(
        module: string,
        className: string,
        methodName: string,
        message: string,
        details?: string
    ): string {
        return `[${module}::${className}::${methodName}] Erro: ${message}` + (details ? ` Detalhes: ${details}` : '');
    }

    public toString(): string {
        return this.message;
    }
}
