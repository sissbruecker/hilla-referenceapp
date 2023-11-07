export interface TimeI18N {
    hour: string;
    hours: string;
    minute: string;
    minutes: string;
    second: string;
    seconds: string;
    justNow: string;
    minuteAgo: string;
    minutesAgo: string;
    hourAgo: string;
    hoursAgo: string;
    dayAgo: string;
    daysAgo: string;
    weekAgo: string;
    weeksAgo: string;
    monthAgo: string;
    monthsAgo: string;
    yearAgo: string;
    yearsAgo: string;
    locale: string;
}

export const ENGLISH: TimeI18N = {
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    second: "second",
    seconds: "seconds",
    justNow: "just now",
    minuteAgo: "a minute ago",
    minutesAgo: "{0} minutes ago",
    hourAgo: "an hour ago",
    hoursAgo: "{0} hours ago",
    dayAgo: "a day ago",
    daysAgo: "{0} days ago",
    weekAgo: "a week ago",
    weeksAgo: "{0} weeks ago",
    monthAgo: "a month ago",
    monthsAgo: "{0} months ago",
    yearAgo: "a year ago",
    yearsAgo: "{0} years ago",
    locale: "en-US"
};

export const SWEDISH: TimeI18N = {
    hour: "timme",
    hours: "timmar",
    minute: "minut",
    minutes: "minuter",
    second: "sekund",
    seconds: "sekunder",
    justNow: "just nu",
    minuteAgo: "en minut sedan",
    minutesAgo: "{0} minuter sedan",
    hourAgo: "en timme sedan",
    hoursAgo: "{0} timmar sedan",
    dayAgo: "en dag sedan",
    daysAgo: "{0} dagar sedan",
    weekAgo: "en vecka sedan",
    weeksAgo: "{0} veckor sedan",
    monthAgo: "en månad sedan",
    monthsAgo: "{0} månader sedan",
    yearAgo: "ett år sedan",
    yearsAgo: "{0} år sedan",
    locale: "sv-FI"
};

export const FINNISH: TimeI18N = {
    hour: "tunti",
    hours: "tuntia",
    minute: "minuutti",
    minutes: "minuuttia",
    second: "sekunti",
    seconds: "sekuntia",
    justNow: "juuri nyt",
    minuteAgo: "minuutti sitten",
    minutesAgo: "{0} minuuttia sitten",
    hourAgo: "tunti sitten",
    hoursAgo: "{0} tuntia sitten",
    dayAgo: "päivä sitten",
    daysAgo: "{0} päivää sitten",
    weekAgo: "viikko sitten",
    weeksAgo: "{0} viikkoa sitten",
    monthAgo: "kuukausi sitten",
    monthsAgo: "{0} kuukautta sitten",
    yearAgo: "vuosi sitten",
    yearsAgo: "{0} vuotta sitten",
    locale: "fi-FI"
}