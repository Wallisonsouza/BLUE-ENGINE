import Obj from "./ObjRepresentation";

interface ParsedResult {
    objects: Obj[];
}

export default class ReadObj {

    public uvsTeste:number[] = [];

    public static read(text: string): ParsedResult {
        
        const lines = text.trim().split('\n');
        const result: ParsedResult = {
            objects: []
        };
    
        let currentObject: Obj | null = null;
        const objectRE = /^#\s*object\s+(.+)$/;
        const objectRE1 = /^o\s+(.+)$/;
    
        lines.forEach(line => {
            line = line.trim();
    
            const objectMatch = line.match(objectRE);
            const objectMatch1 = !objectMatch ? line.match(objectRE1) : null;
            if (objectMatch || objectMatch1) {
                if (currentObject !== null) {
                    result.objects.push(currentObject);
                }
                const match = objectMatch || objectMatch1;
                currentObject = new Obj(match[1].trim());
            } else if (currentObject) {
                this.processLine(line, currentObject);
            }
        });
    
        if (currentObject !== null) {
            result.objects.push(currentObject);
        }

        return result;
    }

    private static processLine(line: string, currentObject: Obj): void {
        if (line.startsWith('v ')) {
            const [, x, y, z] = line.split(/\s+/).map(parseFloat);
            currentObject.addVertex(x, y, z);

        } else if (line.startsWith('vn ')) {
            const [, x, y, z] = line.split(/\s+/).map(parseFloat);
            currentObject.addNormal(x, y, z);

        } else if (line.startsWith('vt ')) {
            const [, u, v] = line.split(/\s+/).map(parseFloat);
            currentObject.addUV(u, v);

        } else if (line.startsWith('f ')) {
            this.processFace(line, currentObject);
        }
    }

    private static processFace(line: string, currentObject: Obj): void {
        const faceParts = line.substring(2).trim().split(/\s+/);
        const parseIndices = (part: string[]) => part.map(index => parseInt(index, 10) - 1);

        if (faceParts.length < 3) {
            console.error("Face does not have enough vertices:", line);
            return;
        }
       
        const [v1, v2, v3] = faceParts.map(part => part.split('/').map(index => index.trim()));

        const [v1Index, v2Index, v3Index] = parseIndices([v1[0], v2[0], v3[0]]);
        const [vt1Index, vt2Index, vt3Index] = parseIndices([v1[1], v2[1], v3[1]]);
        currentObject.vertexIndices.push(v1Index, v2Index, v3Index);
        currentObject.uvIndices.push(vt1Index, vt2Index, vt3Index);

    }
}