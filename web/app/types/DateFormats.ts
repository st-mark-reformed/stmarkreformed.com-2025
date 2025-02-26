export type DateFormats = {
    // Day
    d: string; // 01 to 31
    D: string; // Mon through Sun
    j: string; // 1 to 31
    l: string; // Sunday through Saturday
    S: string; // st, nd, rd or th. Works well with j

    // Month
    F: string; // January through December
    m: string; // 01 through 12
    M: string; // Jan through Dec
    n: string; // 1 through 12

    // Year
    Y: string; // 2025

    // Time
    a: string; // am or pm
    A: string; // AM or PM
    g: string; // 12-hour time 1 through 12
    G: string; // 24- hour time 0 through 23
    h: string; // 12-hour time 01 through 12
    H: string; // 24-hour time 00 through 23
    i: string; // minutes 00 to 59
    s: string; // seconds 00 through 59
};

export function formatDate (date: DateFormats, format: string): string {
    const formatMap: { [key: string]: string } = {
        d: date.d,
        D: date.D,
        j: date.j,
        l: date.l,
        S: date.S,
        F: date.F,
        m: date.m,
        M: date.M,
        n: date.n,
        Y: date.Y,
        a: date.a,
        A: date.A,
        g: date.g,
        G: date.G,
        h: date.h,
        H: date.H,
        i: date.i,
        s: date.s,
    };

    return format.replace(/([dDjlSFmMnYaAgGhHis])/g, (match) => formatMap[match]);
}
