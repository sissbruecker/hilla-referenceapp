export class Duration {

    private readonly durationInSeconds: number;

    private constructor(durationInSeconds: number) {
        if (!Number.isInteger(durationInSeconds) || durationInSeconds < 0) {
            throw "Invalid seconds";
        }
        this.durationInSeconds = durationInSeconds;
    }

    toSeconds(): number {
        return this.durationInSeconds;
    }

    static ofSeconds(seconds: number) {
        return new Duration(seconds);
    }
}