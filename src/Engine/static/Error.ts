export class BufferCreationError extends Error {
    constructor(bufferType: string, message: string) {
        super(`Erro ao criar o buffer de ${bufferType}: ${message}`);
        this.name = "BufferCreationError";
    }
}
