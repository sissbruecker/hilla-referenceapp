import {LocalTime} from "Frontend/types/LocalTime";

export class Duration {

    private readonly durationInSeconds: number;

    constructor(durationInSeconds: number) {
        if (!Number.isInteger(durationInSeconds) || durationInSeconds < 0) {
            throw "Invalid seconds";
        }
        this.durationInSeconds = durationInSeconds;
    }

    toSeconds(): number {
        return this.durationInSeconds;
    }

    static between(from: LocalTime, to: LocalTime): Duration {
        if (from.isEqualTo(to)) {
            return new Duration(86400); // One day
        } else if (to.isBefore(from)) {
            return new Duration(86400 - from.secondsSinceMidnight() + to.secondsSinceMidnight()); // Go past midnight
        } else {
            return new Duration(to.secondsSinceMidnight() - from.secondsSinceMidnight());
        }
    }
}