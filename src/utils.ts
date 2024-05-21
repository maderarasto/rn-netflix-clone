import { ORIGIN } from "./config";

export function formatNumber(num: number, locale: Intl.LocalesArgument = 'en') {
    const formatter = new Intl.NumberFormat(locale);
    return formatter.format(num);
}

export function resolveImagePath(filePath: string) {
    return `${ORIGIN}/assets/images/${filePath}`;
}

export function shuffleItems(items: any[]) {
    return items.map((item) => ({ 
        item, 
        sort: Math.random() 
    })).sort((a, b) => {
        return a.sort - b.sort;
    }).map(({item}) => item);
}