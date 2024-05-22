import { useEffect } from "react";

export function useDebounce(callback: Function, dependency: any[], duration: number) {
    useEffect(() => {
        const handler = window.setTimeout(() => {
            callback();
        }, duration);

        return () => {
            clearTimeout(handler);
        }
    }, [
        ...dependency,
        duration
    ]);
}