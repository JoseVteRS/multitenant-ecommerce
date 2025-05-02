import { getStorageValue } from '../../shared/utils/storage';

export const SOURCE_STORAGE_KEY = 'source';
export const SOURCE_QUERY_KEY = 'source';

export const NATIVE_APP_SOURCE = 'nativeapp';

const initialSearchParams = new URLSearchParams(window.location.search).get('source');

/**
 * Returns true if we are in an app.
 * @returns
 */
export function isInApp() {
    if (initialSearchParams === NATIVE_APP_SOURCE) {
        return true;
    }

    return getStorageValue(SOURCE_STORAGE_KEY) === NATIVE_APP_SOURCE;
}
