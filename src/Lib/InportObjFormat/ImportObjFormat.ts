/**
 * Classe responsável por carregar arquivos OBJ.
 * 
 * Esta classe facilita a importação de modelos 3D em formato OBJ,
 * oferecendo uma interface assíncrona para carregar o conteúdo do arquivo.
 */
export default class ImportObjFormat {
    private readonly objFilePath: string;

    /**
     * Construtor da classe ObjImporter.
     * 
     * @param filePath O caminho para o arquivo OBJ a ser carregado.
     */
    constructor(filePath: string) {
        this.objFilePath = filePath;
    }

    /**
     * Carrega o conteúdo do arquivo OBJ a partir do caminho especificado.
     * 
     * @returns Uma promessa que resolve para o conteúdo do arquivo OBJ como uma string.
     * @throws Lança um erro se houver falha ao carregar o arquivo.
     */
    public async loadOBJ(): Promise<string> {
        const response = await fetch(this.objFilePath);

        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo OBJ: ${response.statusText}`);
        }
        
        return response.text();
    }
}
