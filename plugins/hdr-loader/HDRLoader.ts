export interface HDR {
    header: string[];
    dimensionsLine: string;
    dimensions: HDRDimension;
    pixelData: Float32Array;
}

interface HDRDimension {
    width: number;
    height: number;
}

export default class HDRLoader {
   
    private static async readBinaryFile(path: string): Promise<ArrayBuffer> {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error('Erro ao buscar o arquivo HDR');
        }
        return await response.arrayBuffer();
    }

    // Converte ArrayBuffer para string
    private static arrayBufferToString(buffer: ArrayBuffer): string {
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(buffer);
    }

    // Converte ArrayBuffer para Uint8Array
    private static arrayBufferToUint8Array(buffer: ArrayBuffer): Uint8Array {
        return new Uint8Array(buffer);
    }
   
    // Processa o arquivo HDR e retorna um objeto HDR
    public static async processHDRImage(path: string): Promise<HDR> {
        try {
            const binary = await HDRLoader.readBinaryFile(path);
            const text = HDRLoader.arrayBufferToString(binary);

            // Separar o cabeçalho do restante do conteúdo
            const headerEndIndex = text.indexOf('\n\n');
            if (headerEndIndex === -1) {
                throw new Error('Cabeçalho não encontrado');
            }

            const header = text.slice(0, headerEndIndex).trim().split("\n");
            const contentAfterHeader = text.slice(headerEndIndex + 2).trim();

            // Separar a linha de dimensões do conteúdo restante
            const dimensionLineEndIndex = contentAfterHeader.indexOf('\n');
            if (dimensionLineEndIndex === -1) {
                throw new Error('Linha de dimensões não encontrada');
            }

            const dimensionLine = contentAfterHeader.slice(0, dimensionLineEndIndex).trim();
            const content = contentAfterHeader.slice(dimensionLineEndIndex + 1).trim(); 


            // Processar o conteúdo binário (remover o cabeçalho e a linha de dimensões)
            const buffer = HDRLoader.arrayBufferToUint8Array(binary);
            const dataOffset = headerEndIndex + dimensionLineEndIndex + 3; // +3 para incluir '\n\n' e a linha de dimensões

            const pixelDataBuffer = buffer.slice(dataOffset); // Extrair dados de imagem
            const dimensions: HDRDimension = this.parseDimensionLine(dimensionLine);

            // Decodificar os dados HDR
            const pixelData = rleRgbeFloat32(pixelDataBuffer, dimensions.width, dimensions.height);

            return {
                header: header,
                dimensions: dimensions,
                dimensionsLine: dimensionLine,
                pixelData: pixelData
            };
        } catch (error) {
            console.error('Erro ao processar o arquivo HDR:', error);
            throw error;
        }
    }

    private static parseDimensionLine(line: string): HDRDimension {
        const regex = /([-\+][XY])\s+(\d+)/g;
        let width: number | null = null;
        let height: number | null = null;

        let match;
        while ((match = regex.exec(line)) !== null) {
            const identifier = match[1];
            const value = parseInt(match[2], 10);

            if (identifier === '-Y' || identifier === '+Y') {
                height = value;
            } else if (identifier === '-X' || identifier === '+X') {
                width = value;
            }
        }

        if (width === null || height === null || isNaN(width) || isNaN(height)) {
            throw new Error('Dimensões inválidas ou não encontradas na linha de dimensões');
        }

        return { width, height };
    }

    public static createWebGLTexture(gl: WebGL2RenderingContext, hdrData: HDR): WebGLTexture {
        const { width, height } = hdrData.dimensions;
        let pixelData = hdrData.pixelData;
    
        // Verifique se pixelData é um Float32Array
        if (!(pixelData instanceof Float32Array)) {
            throw new Error('pixelData deve ser uma instância de Float32Array');
        }
    
        // Inverter a ordem das linhas de pixels
        const invertedPixelData = new Float32Array(width * height * 4);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const srcIndex = ((height - 1 - y) * width + x) * 4;
                const destIndex = (y * width + x) * 4;
                invertedPixelData[destIndex] = pixelData[srcIndex];
                invertedPixelData[destIndex + 1] = pixelData[srcIndex + 1];
                invertedPixelData[destIndex + 2] = pixelData[srcIndex + 2];
                invertedPixelData[destIndex + 3] = pixelData[srcIndex + 3];
            }
        }
    
        // Criar e configurar a textura
        const texture = gl.createTexture();
        if (!texture) {
            throw new Error('Falha ao criar a textura WebGL');
        }
    
        gl.bindTexture(gl.TEXTURE_2D, texture);
    
        // Configurar os parâmetros da textura
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    
        // Criar a textura a partir dos dados HDR
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,                          // Mip level
            gl.RGBA32F,                 // Internal format (WebGL 2.0)
            width,                      // Largura
            height,                     // Altura
            0,                          // Border (não usado em WebGL 2.0)
            gl.RGBA,                    // Format
            gl.FLOAT,                   // Type
            invertedPixelData           // Dados da imagem
        );
    
        // Verifique se a textura foi configurada corretamente
        const minFilter = gl.getTexParameter(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER);
        const magFilter = gl.getTexParameter(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER);
        const wrapS = gl.getTexParameter(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S);
        const wrapT = gl.getTexParameter(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T);
    
        if (minFilter === undefined || magFilter === undefined || wrapS === undefined || wrapT === undefined) {
            throw new Error('A configuração da textura não foi concluída corretamente');
        }
    
        // Desvincular a textura
        gl.bindTexture(gl.TEXTURE_2D, null);
    
        return texture;
    }
}

function convertRLEToRGBE(buffer: Uint8Array, width: number, height: number): Uint8Array {
    const rgbeData = new Uint8Array(width * height * 4); // Cria um array para armazenar os valores RGBE
    let pos = 0; // Posição atual no buffer de entrada
    let index = 0; // Posição atual na matriz de saída RGBE

    // Loop através de cada linha de scan (scanline) da imagem
    for (let y = 0; y < height; y++) {
        // Verifica se os primeiros dois bytes da scanline são '2 2', indicando uma linha de dados comprimidos RLE
        if (buffer[pos] !== 2 || buffer[pos + 1] !== 2) {
            throw new Error('Formato de scanline HDR inválido: identificadores iniciais não encontrados');
        }

        const scanlineWidth = (buffer[pos + 2] << 8) | buffer[pos + 3]; // Largura da scanline a partir dos próximos 2 bytes
        if (scanlineWidth !== width) {
            throw new Error(`Largura da scanline (${scanlineWidth}) não corresponde à largura da imagem (${width})`);
        }

        pos += 4; // Move a posição para depois do cabeçalho da scanline

        const rgbe = new Uint8Array(width * 4); // Array temporário para armazenar os valores RGBA da scanline

        // Decodificação RLE para os quatro canais (R, G, B, E)
        for (let i = 0; i < 4; i++) {
            let channelPos = 0;
            while (channelPos < width) {
                if (pos >= buffer.length) {
                    throw new Error('Fim inesperado do buffer ao decodificar RLE');
                }

                const count = buffer[pos++]; // Conta o número de pixels ou um marcador de repetição
                if (count > 128) {
                    const value = buffer[pos++];
                    const runLength = count - 128; // Número de vezes para repetir o valor
                    if (channelPos + runLength > width) {
                        throw new Error('Run-length excede a largura da scanline');
                    }
                    for (let j = 0; j < runLength; j++) {
                        rgbe[channelPos * 4 + i] = value; // Preenche o canal correspondente com o valor repetido
                        channelPos++;
                    }
                } else {
                    for (let j = 0; j < count; j++) {
                        if (pos >= buffer.length) {
                            throw new Error('Fim inesperado do buffer ao ler valores de cor');
                        }
                        rgbe[channelPos * 4 + i] = buffer[pos++]; // Lê os valores diretamente do buffer
                        channelPos++;
                    }
                }
            }
        }

        // Copia a scanline decodificada para o array de saída
        for (let x = 0; x < width; x++) {
            rgbeData[index++] = rgbe[x * 4];
            rgbeData[index++] = rgbe[x * 4 + 1];
            rgbeData[index++] = rgbe[x * 4 + 2];
            rgbeData[index++] = rgbe[x * 4 + 3];
        }
    }

    return rgbeData;
}
function convertRGBEToRGBA32F(rgbeData: Uint8Array): Float32Array {
    const numPixels = rgbeData.length / 4; 
    const rgba32fData = new Float32Array(numPixels * 4); 

    for (let i = 0; i < numPixels; i++) {
        const r = rgbeData[i * 4 + 0] / 255.0;
        const g = rgbeData[i * 4 + 1] / 255.0;
        const b = rgbeData[i * 4 + 2] / 255.0;
        const e = rgbeData[i * 4 + 3];

        if (e > 0) {
            const exp = Math.pow(2.0, e - 128.0);
            rgba32fData[i * 4 + 0] = r * exp; 
            rgba32fData[i * 4 + 1] = g * exp; 
            rgba32fData[i * 4 + 2] = b * exp; 
        } else {
            rgba32fData[i * 4 + 0] = 0.0;
            rgba32fData[i * 4 + 1] = 0.0;
            rgba32fData[i * 4 + 2] = 0.0;
        }
        rgba32fData[i * 4 + 3] = 1.0; // Alfa fixo em 1.0
    }

    return rgba32fData;
}

function rleRgbeFloat32(buffer: Uint8Array, width: number, height: number): Float32Array {
    const rgbe = convertRLEToRGBE(buffer, width, height);
    const rgba32f = convertRGBEToRGBA32F(rgbe);

    return applyUncharted2ToneMapping(rgba32f)
}


function applyGaussianBlur(texture: Float32Array, width: number, height: number): Float32Array {
    const blurredTexture = new Float32Array(texture.length);
    const kernel = [
        1/16, 2/16, 1/16,
        2/16, 4/16, 2/16,
        1/16, 2/16, 1/16
    ];
    const kernelSize = 3;
    const halfKernelSize = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, a = 0;
            
            for (let ky = -halfKernelSize; ky <= halfKernelSize; ky++) {
                for (let kx = -halfKernelSize; kx <= halfKernelSize; kx++) {
                    const pixelX = Math.min(width - 1, Math.max(0, x + kx));
                    const pixelY = Math.min(height - 1, Math.max(0, y + ky));
                    const offset = (pixelY * width + pixelX) * 4;
                    const kernelValue = kernel[(ky + halfKernelSize) * kernelSize + (kx + halfKernelSize)];

                    r += texture[offset] * kernelValue;
                    g += texture[offset + 1] * kernelValue;
                    b += texture[offset + 2] * kernelValue;
                    a += texture[offset + 3] * kernelValue;
                }
            }

            const offset = (y * width + x) * 4;
            blurredTexture[offset] = r;
            blurredTexture[offset + 1] = g;
            blurredTexture[offset + 2] = b;
            blurredTexture[offset + 3] = a; // Mantendo o valor alfa inalterado
        }
    }

    return blurredTexture;
}

// ajusta o brilho e o contraste
function adjustBrightnessContrast(texture: Float32Array, brightness: number, contrast: number): Float32Array {
    const adjustedTexture = new Float32Array(texture.length);

    // Aplicar ajuste de brilho e contraste
    for (let i = 0; i < texture.length; i += 4) {
        let r = texture[i];
        let g = texture[i + 1];
        let b = texture[i + 2];

        // Ajuste de brilho
        r = r + brightness;
        g = g + brightness;
        b = b + brightness;

        // Ajuste de contraste
        r = ((r - 0.5) * contrast) + 0.5;
        g = ((g - 0.5) * contrast) + 0.5;
        b = ((b - 0.5) * contrast) + 0.5;

        // Certificar-se de que os valores estão dentro do intervalo [0, 1]
        r = Math.max(0, Math.min(1, r));
        g = Math.max(0, Math.min(1, g));
        b = Math.max(0, Math.min(1, b));

        // Atualizar o array ajustado
        adjustedTexture[i] = r;
        adjustedTexture[i + 1] = g;
        adjustedTexture[i + 2] = b;
        adjustedTexture[i + 3] = texture[i + 3]; // Manter o alfa inalterado
    }

    return adjustedTexture;
}

// mapeia os tons
function applyReinhardToneMapping(texture: Float32Array, gamma: number = 2.2): Float32Array {
    const mappedTexture = new Float32Array(texture.length);

    for (let i = 0; i < texture.length; i += 4) {
        let r = texture[i];
        let g = texture[i + 1];
        let b = texture[i + 2];

        // Aplicar o mapeamento de tons Reinhard
        r = r / (r + 1.0); // Normaliza e aplica o mapeamento de tons
        g = g / (g + 1.0);
        b = b / (b + 1.0);

        // Aplicar correção gamma
        r = Math.pow(r, 1.0 / gamma);
        g = Math.pow(g, 1.0 / gamma);
        b = Math.pow(b, 1.0 / gamma);

        // Atualizar o array ajustado
        mappedTexture[i] = r;
        mappedTexture[i + 1] = g;
        mappedTexture[i + 2] = b;
        mappedTexture[i + 3] = texture[i + 3]; // Manter o alfa inalterado
    }

    return mappedTexture;
}

// recupera detalhes em areas brilhantes
function recoverWhiteDetails(texture: Float32Array, offset: number = 0.5): Float32Array {
    const recoveredTexture = new Float32Array(texture.length);

    for (let i = 0; i < texture.length; i += 4) {
        let r = texture[i];
        let g = texture[i + 1];
        let b = texture[i + 2];

        // Recuperar detalhes em áreas brilhantes
        if (r > 1.0 || g > 1.0 || b > 1.0) {
            // Reduz a intensidade dos canais que estão acima do limite
            r = Math.min(r * offset, 1.0);
            g = Math.min(g * offset, 1.0);
            b = Math.min(b * offset, 1.0);
        }

        // Atualizar o array ajustado
        recoveredTexture[i] = r;
        recoveredTexture[i + 1] = g;
        recoveredTexture[i + 2] = b;
        recoveredTexture[i + 3] = texture[i + 3]; // Manter o alfa inalterado
    }

    return recoveredTexture;
}

function applyUncharted2ToneMapping(texture: Float32Array, gamma: number = 2.2): Float32Array {
    const mappedTexture = new Float32Array(texture.length);
    
    for (let i = 0; i < texture.length; i += 4) {
        let r = texture[i];
        let g = texture[i + 1];
        let b = texture[i + 2];

        // Aplicar o mapeamento de tons Uncharted 2
        r = (r * (0.15 * r + 0.50)) / (r * (0.15 * r + 0.50) + 0.10);
        g = (g * (0.15 * g + 0.50)) / (g * (0.15 * g + 0.50) + 0.10);
        b = (b * (0.15 * b + 0.50)) / (b * (0.15 * b + 0.50) + 0.10);

        // Aplicar correção gamma
        r = Math.pow(r, 1.0 / gamma);
        g = Math.pow(g, 1.0 / gamma);
        b = Math.pow(b, 1.0 / gamma);

        // Atualizar o array ajustado
        mappedTexture[i] = r;
        mappedTexture[i + 1] = g;
        mappedTexture[i + 2] = b;
        mappedTexture[i + 3] = texture[i + 3]; // Manter o alfa inalterado
    }

    return mappedTexture;
}
