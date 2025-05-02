import type IConfigDev from './config.development.json';

export let config: typeof IConfigDev = { ...APP_CONFIG };

declare const APP_CONFIG: typeof IConfigDev;

const response = fetch('/config.json').then((request) => request.json());

export async function loadConfig(): Promise<void> {
    const remoteConfig = await response;

    config = { ...APP_CONFIG, ...remoteConfig };
}
