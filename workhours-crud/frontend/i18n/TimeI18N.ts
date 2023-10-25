export interface TimeI18N {
    hour: string;
    hours: string;
    minute: string;
    minutes: string;
    second: string;
    seconds: string;
}

export const ENGLISH: TimeI18N = {
    hour: "hour",
    hours: "hours",
    minute: "minute",
    minutes: "minutes",
    second: "second",
    seconds: "seconds"
};

export const SWEDISH: TimeI18N = {
    hour: "timme",
    hours: "timmar",
    minute: "minut",
    minutes: "minuter",
    second: "sekund",
    seconds: "sekunder"
};

export const FINNISH: TimeI18N = {
    hour: "tunti",
    hours: "tuntia",
    minute: "minuutti",
    minutes: "minuuttia",
    second: "sekunti",
    seconds: "sekuntia"
}