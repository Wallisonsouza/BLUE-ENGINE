export default class Time {
    private static _deltaTime: number = 0;
    private static _time: number = 0;
    public static getDeltaTime(): number {
        return this._deltaTime;
    }
    public static setDeltaTime(newDeltaTime: number): void {
        this._deltaTime = newDeltaTime;
    }
    public static setTime(newTime: number) {
        this._time = newTime;
    }
    public static getTime(): number {
        return this._time;
    }
}