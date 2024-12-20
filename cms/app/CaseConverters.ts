export function PascalToTitle (from: string) {
    return from.split(/(?=[A-Z])/).join(' ');
}
