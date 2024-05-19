import { ORIGIN } from "./config";

export function formatNumber(num: number, locale: Intl.LocalesArgument = 'en') {
    const formatter = new Intl.NumberFormat(locale);
    return formatter.format(num);
}

export function resolveImagePath(filePath: string) {
    return `${ORIGIN}/assets/images/${filePath}`;
}