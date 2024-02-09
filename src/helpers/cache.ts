type TimeBasedCacheEntry = {
    value: string;
    expirationTime: number;
    timeoutId: NodeJS.Timeout;
};

type TimeBasedCacheType = {
    [key: string]: TimeBasedCacheEntry;
};

export default class TimeBasedCache {
    private cache: TimeBasedCacheType;
    constructor() {
        this.cache = {};
    }

    set(key: string | number, value: string, expirationTimeMs: number) {
        // Add a new entry if the key doesn't exist
        if (this.cache[key]) {
            // Update the existing entry
            this.update(key, value, expirationTimeMs);
        } else {
            // eslint-disable-next-line no-console
            console.log("Cache.Set", key, expirationTimeMs, Date.now());
            this.cache[key] = {
                value,
                expirationTime: Date.now() + expirationTimeMs,
                timeoutId: setTimeout(() => {
                    this.remove(key);
                }, expirationTimeMs)
            };
        }
    }

    get(key: string | number) {
        // eslint-disable-next-line no-console
        console.log("Cache.Get", key, Date.now());
        const entry = this.cache[key];
        if (entry && entry.expirationTime > Date.now()) {
            return entry.value;
        }
        // If the entry is expired or doesn't exist, return null or handle accordingly
        return null;
    }

    remove(key: string | number) {
        // eslint-disable-next-line no-console
        console.log("Cache.Remove", key, Date.now());

        const timeoutId = this.cache[key]?.timeoutId;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        delete this.cache[key];
    }

    update(key: string | number, value: string, expirationTimeMs: number) {
        // eslint-disable-next-line no-console
        console.log("Cache.Update", key, expirationTimeMs, Date.now());

        // Clear the existing timeout
        const existingTimeoutId = this.cache[key]?.timeoutId;
        if (existingTimeoutId) {
            clearTimeout(existingTimeoutId);
        }

        // Update the value and expiration time for the existing entry
        this.cache[key] = {
            value,
            expirationTime: Date.now() + expirationTimeMs,
            timeoutId: setTimeout(() => {
                this.remove(key);
            }, expirationTimeMs)
        };
    }

    clear(): void {
        // Clear all timeouts and reset the cache
        Object.keys(this.cache).forEach(key => {
            const timeoutId = this.cache[key].timeoutId;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        });

        this.cache = {};
    }
}
