// Definindo o enum para tipos de arquivos
enum FileType {
    HDR,
    JPG,
    PNG,
}

// Classe FileLoader que utiliza o enum FileType
export default class FileLoader {
    private fileType: FileType;

    constructor(fileType: FileType) {
        this.fileType = fileType;
    }

    // Adicione métodos conforme necessário para a lógica de carregamento de arquivos
    public loadFile(filePath: string): void {
        console.log(`Carregando o arquivo ${filePath} do tipo ${FileType[this.fileType]}`);
        // Implementar lógica para carregar o arquivo com base no tipo
    }
}

// Exemplo de uso
const loader = new FileLoader(FileType.HDR);
loader.loadFile("example.hdr");
