import type { Config } from "../types";

/**
 * Base class for all resources
 * @class Base
 * @abstract
 * @throws Error
 * @constructor Base
 * @param {Config} config
 * @property {string} apiKey
 * @property {string} baseUrl
 * @method request
 * */
export abstract class Base {
    readonly apiKey: string;
    readonly baseUrl: string;

    /**
     * Create a new instance of the base class
     * @param apiKey
     * @param baseUrl
     * @throws Error
     * @constructor Base
     */
    constructor({ apiKey, baseUrl }: Config) {
        if (!apiKey || apiKey === "") {
            throw new Error("Api key not configured");
        }

        if (!baseUrl || baseUrl === "") {
            throw new Error("Base URL not configured");
        }

        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    /**
     * Make a request to the API using fetch and return the serialized response
     * @param endpoint
     * @param options
     * @returns {Promise<T>}
     */
    async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }

        const headers = {
            "Content-Type": "application/json",
            "X-API-Key": this.apiKey,
            Orgin: this.baseUrl
        };

        const response = await fetch(url, {
            ...options,
            headers,
            mode: "no-cors"
        });

        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }
}
