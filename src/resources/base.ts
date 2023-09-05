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
export default abstract class Base {
    readonly apiKey: string;
    readonly baseUrl: string;
    readonly apiPath: string;

    /**
     * Create a new instance of the base class
     * @param {Config} config
     * @throws Error
     * @constructor Base
     */
    constructor(config: Config) {
        if (!config.apiKey || config.apiKey === "") {
            throw new Error("Api key not configured");
        }

        if (!config.baseUrl || config.baseUrl === "") {
            throw new Error("Base URL not configured");
        }

        this.apiPath = config.apiPath || "/cms/api/public/v1";
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl;
    }

    /**
     * Make a request to the API using fetch and return the serialized response
     * @param endpoint
     * @param options
     * @param preview
     * @returns {Promise<Response>}
     */
    async request<T>(
        endpoint: string,
        options: RequestInit,
        preview = false
    ): Promise<Response> {
        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }

        const url = `${this.baseUrl}${this.apiPath}${endpoint}`;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("X-API-Key", this.apiKey);

        const response = await fetch(url, {
            ...options,
            cache: preview ? "no-cache" : "default",
            headers
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response;
    }

    /**
     * Make a GET request to the API
     * @param endpoint
     * @param preview
     */
    async get<T>(endpoint: string, preview = false): Promise<Response> {
        return await this.request<T>(
            endpoint,
            {
                method: "GET"
            },
            preview
        );
    }

    /**
     * Make a POST request to the API
     * @param endpoint
     * @param preview
     */
    async post<T>(endpoint: string, preview = false): Promise<Response> {
        return await this.request<T>(
            endpoint,
            {
                method: "POST"
            },
            preview
        );
    }
}
