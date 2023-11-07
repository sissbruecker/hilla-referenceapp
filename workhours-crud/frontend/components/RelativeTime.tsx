import {TimeI18N} from "Frontend/i18n/TimeI18N";
import {formatPastDate} from "Frontend/i18n/RelativeTimeFormatter";
import {formatShortDateTime} from "Frontend/i18n/DateTimeFormatter";

export interface RelativeTimeProps {
    date: string | Date;
    i18n?: TimeI18N
}

export default function RelativeTime(props: RelativeTimeProps) {
    // TODO Register a timer that updates the relative time every minute
    const d = new Date(props.date);
    return <span title={formatShortDateTime(d, props.i18n)}>{formatPastDate(d, props.i18n)}</span>;
}