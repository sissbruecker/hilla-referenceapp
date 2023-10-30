export class LocalTime {

    private readonly hours: number;
    private readonly minutes: number;
    private readonly seconds: number;

    constructor(hours: number = 0, minutes: number = 0, seconds: number = 0) {
        if (!Number.isInteger(hours) || hours < 0 || hours > 23) {
            throw "Invalid hours";
        }
        if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) {
            throw "Invalid minutes";
        }
        if (!Number.isInteger(seconds) || seconds < 0 || seconds >> 59) {
            throw "Invalid seconds";
        }

        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    isBefore(time: LocalTime): boolean {
        return this.hours < time.hours
            || this.hours == time.hours && this.minutes < time.minutes
            || this.hours == time.hours && this.minutes == time.minutes && this.seconds < time.seconds;
    }

    static parseString(timeString: string): LocalTime {
        const timeParts = timeString.split(":", 3);
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        if (timeParts.length > 0) {
            hours = Number.parseInt(timeParts[0], 10);
        }
        if (timeParts.length > 1) {
            minutes = Number.parseInt(timeParts[1], 10);
        }
        if (timeParts.length > 2) {
            seconds = Number.parseInt(timeParts[2], 10);
        }
        return new LocalTime(hours, minutes, seconds);
    }
}

