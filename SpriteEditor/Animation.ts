export interface Animation2DData {
    x: number;
    y: number;
    width: number;
    height: number;
    uvX: number;
    uvY: number;
}

export default class Animation2D {

    /**
     * Gera um arquivo binário a partir dos dados de animação.
     * @param data - Array de dados de animação.
     * @returns ArrayBuffer com os dados binários.
     */
    public static generateBinaryFile(data: Animation2DData[]): ArrayBuffer {
        const floatsPerEntry = 6;
        const bufferLength = data.length * floatsPerEntry * Float32Array.BYTES_PER_ELEMENT;
        const buffer = new ArrayBuffer(bufferLength);
        const view = new DataView(buffer);
    
        data.forEach((item, index) => {
            const offset = index * floatsPerEntry * Float32Array.BYTES_PER_ELEMENT;
            view.setFloat32(offset, item.x, true);  
            view.setFloat32(offset + 4, item.y, true);
            view.setFloat32(offset + 8, item.width, true);
            view.setFloat32(offset + 12, item.height, true);
            view.setFloat32(offset + 16, item.uvX, true);
            view.setFloat32(offset + 20, item.uvY, true);
        });
    
        return buffer;
    }

    /**
     * Faz o download de um arquivo binário.
     * @param buffer - ArrayBuffer contendo os dados binários.
     * @param fileName - Nome do arquivo para download.
     */
    public static downloadBinaryFile(buffer: ArrayBuffer, fileName: string): void {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    /**
     * Analisa um arquivo binário e converte para dados de animação.
     * @param buffer - ArrayBuffer contendo os dados binários.
     * @returns Array de dados de animação.
     */
    public static parseBinaryFile(buffer: ArrayBuffer): Animation2DData[] {
        const floatsPerEntry = 6;
        const view = new DataView(buffer);
        const data: Animation2DData[] = [];
        
        for (let offset = 0; offset < view.byteLength; offset += floatsPerEntry * Float32Array.BYTES_PER_ELEMENT) {
            const x = view.getFloat32(offset, true);
            const y = view.getFloat32(offset + 4, true);
            const width = view.getFloat32(offset + 8, true);
            const height = view.getFloat32(offset + 12, true);
            const uvX = view.getFloat32(offset + 16, true);
            const uvY = view.getFloat32(offset + 20, true);

            data.push({ x, y, width, height, uvX, uvY });
        }
        
        return data;
    }

    /**
     * Lê um arquivo binário e converte para dados de animação.
     * @param file - Arquivo a ser lido.
     * @returns Promise que resolve com os dados de animação.
     */
    public static readBinaryFile(file: File): Promise<Animation2DData[]> {
        return new Promise((resolve, reject) => {
            if (!file.name.endsWith('.animation')) {
                return reject(new Error('Arquivo inválido. Por favor, selecione um arquivo .animation.'));
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const buffer = event.target.result as ArrayBuffer;
                    try {
                        const animationData = Animation2D.parseBinaryFile(buffer);
                        resolve(animationData);
                    } catch (error) {
                        reject(error);
                    }
                }
            };

            reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
            reader.readAsArrayBuffer(file);
        });
    }
}
