import Color from "./color";

export default class Debug {
private static console = document.getElementById("console") as HTMLDivElement;
    private static logBuffer: string[] = [];
    private static logSet: Set<string> = new Set();
    private static maxLogLength = 1000;
    private static isScheduled = false;

    public static log<T>(message: T): void {
        const logMessage = this.toString(message);
        if (!this.logSet.has(logMessage)) {
            this.logBuffer.push(logMessage);
            this.logSet.add(logMessage);
            if (this.logSet.size > this.maxLogLength) {
                const oldestLog = this.logBuffer.shift();
                if (oldestLog) this.logSet.delete(oldestLog);
            }
            this.scheduleLogUpdate();
        }
    }

    private static scheduleLogUpdate(): void {
        if (!this.isScheduled) {
            this.isScheduled = true;
            requestAnimationFrame(() => {
                this.updateConsole();
                this.isScheduled = false;
            });
        }
    }

    private static updateConsole(): void {
        this.console.innerText = this.logBuffer.slice().reverse().join("\n");
    }

    public static toString<T>(value: T): string {
        if (value === null) {
            return 'null';
        } else if (value === undefined) {
            return 'undefined';
        } else if (typeof value === 'object') {
            return JSON.stringify(value, null, 2).substring(0, 1000); // Limita a string JSON a 1000 caracteres
        } else {
            return value.toString();
        }
    }
    
    public static error(message: string): void {
        console.error("Error: " + message);
    }

    public static solutionLineColor(message: string, color: Color): void {
        console.log("Solution: " + `%c${message}`, `color: ${color.toString()}`);
    }

    public static warn(message: string): void {
        console.warn(message);
    }

    public static info(message: string): void {
        console.info(message);
    }

    public static group(name: string): void {
        console.group(name);
    }

    public static groupEnd(): void {
        console.groupEnd();
    }

    public static logLineColor(message: string, color: Color): void {
        console.log("Log: " + `%c${message}`, `color: ${color.toString()}`);
    }

    public static errorLineColor(message: string, color: Color): void {
        console.error("Erro: " + `%c${message}`, `color: ${color.toString()}`);
    }

    public static errorCode(message: string, code: number): void {
        console.error(`%c${message}`, `color: ${Color.red.toString()}; font-size: 16px; font-weight: bold;`, code);
    }


    public static es(object: {TARGET: string, ERROR: string, SOLUTION: string}) {

        console.group("ERROR IN: " + `%c${object.TARGET}`, `color: ${Color.red.toString()}; font-size: 12px; font-weight: bold;`);
        console.error("ERROR: " + `%c${object.ERROR}`, `color: ${Color.orange.toString()}`);
        console.log("SOLUTION: " + `%c${object.SOLUTION}`, `color: ${Color.cyan.toString()}`);
       
        console.groupEnd();

    }
       
}


