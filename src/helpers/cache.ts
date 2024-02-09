export default class TimeBasedCache {
    private readonly cache = {} as {
        [key: string]: { value: string; expirationTime: number };
    };
    constructor() {
        this.cache = {};
    }

    set(key: string | number, value: string, expirationTimeMs: number) {
        // Add a new entry if the key doesn't exist
        if (!this.cache[key]) {
            // eslint-disable-next-line no-console
            console.log("Cache.Set", key, expirationTimeMs, Date.now());
            this.cache[key] = {
                value,
                expirationTime: Date.now() + expirationTimeMs
            };

            // Schedule a timeout to remove the entry after the specified expiration time
            setTimeout(() => {
                this.remove(key);
            }, expirationTimeMs);
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
        delete this.cache[key];
    }
}
