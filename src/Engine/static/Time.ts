export default class Time {
    private accumulator: number = 0;
    private isRunning: boolean = false;
    private readonly maxFrameSkip: number = 5; 

    public static deltaTime: number = 0;
    public static time: number = 0;
    public static readonly fixedDeltaTime: number = 1 / 50; 

    constructor(
        private readonly updateCallback: (deltaTime: number) => void,
        private readonly fixedUpdateCallback: (deltaTime: number) => void,
        private readonly lateUpdateCallback: (deltaTime: number) => void
    ) {}

    public start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        Time.time = performance.now();
        this.loop();
    }

    public stop(): void {
        this.isRunning = false;
    }

    private loop(): void {
        if (!this.isRunning) return;

        const now = performance.now();
        Time.deltaTime = (now - Time.time) / 1000; 
        Time.time = now;
        this.accumulator += Time.deltaTime;
        let steps = 0;
       
        while (this.accumulator >= Time.fixedDeltaTime && steps < this.maxFrameSkip) {
            this.fixedUpdateCallback(Time.fixedDeltaTime);
            this.accumulator -= Time.fixedDeltaTime;
            steps++;
        }

        this.updateCallback(Time.deltaTime);
        this.lateUpdateCallback(Time.deltaTime);
       
        requestAnimationFrame(() => this.loop());

      
    }
}
