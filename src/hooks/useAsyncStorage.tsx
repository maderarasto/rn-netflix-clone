import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Nullable } from "@src/types";

type Setter<T> = (value: T) => void;

export function useAsyncStorage<T>(storageKey: string, defaultValue: T): [Nullable<T>, Setter<T>, Function] {
    const [storageValue, setStorageValue] = useState<Nullable<T>>(null);

    useEffect(() => {
        loadStorageItem();
    }, []);

    async function loadStorageItem() {
        const stringValue = await AsyncStorage.getItem(storageKey);

        if (!stringValue) {
            setStorageValue(defaultValue);
            return;
        }

        let value: T;

        try {
            value = JSON.parse(stringValue) as T;
        } catch (ex) {
            return stringValue as T;
        }

        setStorageValue(value);
    }

    async function setStorageItem(value: T) {
        await AsyncStorage.setItem(storageKey, typeof value !== 'string' ? JSON.stringify(value) : value);
        setStorageValue(value);
    }

    async function refreshStorageItem() {
        return loadStorageItem();
    }

    return [storageValue, setStorageItem, refreshStorageItem];
}