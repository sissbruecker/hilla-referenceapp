import {ENGLISH, TimeI18N} from "Frontend/i18n/TimeI18N";

export function formatShortDateTime(date: Date, i18n: TimeI18N = ENGLISH): string {
    const format = new Intl.DateTimeFormat(i18n.locale, {
        dateStyle: "short",
        timeStyle: "short"
    });
    return format.format(date);
}