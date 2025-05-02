const fallBackStorage: Record<string, unknown> = {};

export function setStorageValue(key: string, value: unknown, driver: Storage = localStorage) {
    try {
        driver.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error(e);
        fallBackStorage[key] = value;
        return;
    }
}

export function getStorageValue<T>(key: string, driver: Storage = localStorage): T | undefined {
    try {
        const item = driver.getItem(key);

        if (!item) {
            return undefined;
        }

        return JSON.parse(item) as T;
    } catch {
        return fallBackStorage[key] as T | undefined;
    }
}

export function removeStorageValue(key: string, driver: Storage = localStorage) {
    try {
        driver.removeItem(key);
    } finally {
        delete fallBackStorage[key];
    }
}
