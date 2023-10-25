import {ENGLISH, TimeI18N} from "Frontend/i18n/TimeI18N";
import {Duration} from "Frontend/types/Duration";

export function formatDuration(duration: Duration, i18n: TimeI18N = ENGLISH): string {
    const seconds = duration.toSeconds();
    const hourPart = Math.floor(seconds / 3600);
    const minutePart = Math.floor((seconds - hourPart * 3600) / 60);
    const secondPart = seconds - hourPart * 3600 - minutePart * 60;

    let formatted = "";
    if (hourPart > 0) {
        formatted = formatted.concat(hourPart.toString(10), " ", hourPart == 1 ? i18n.hour : i18n.hours);
    }

    if (minutePart > 0) {
        if (formatted.length > 0) {
            formatted = formatted.concat(" ");
        }
        formatted = formatted.concat(minutePart.toString(10), " ", minutePart == 1 ? i18n.minute : i18n.minutes);
    }

    if (secondPart > 0) {
        if (formatted.length > 0) {
            formatted = formatted.concat(" ");
        }
        formatted = formatted.concat(secondPart.toString(10), " ", secondPart == 1 ? i18n.second : i18n.seconds);
    }

    return formatted;
}