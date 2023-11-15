import type { Config } from "../index";

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
     * @param endpoint - The endpoint to make the request to
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async request<T>(
        endpoint: string,
        token?: string | null | undefined,
        options?: RequestInit
    ): Promise<Response> {
        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }

        const url = token
            ? `${this.baseUrl}${this.apiPath}${endpoint}?t=${token}`
            : `${this.baseUrl}${this.apiPath}${endpoint}`;

        const fetchOptions = {
            ...(options || {}),
            headers: {
                ...(options?.headers ?? {}),
                "Content-Type": "application/json",
                "X-API-Key": this.apiKey
            }
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok && response.statusText) {
            throw new Error(response.statusText);
        }

        return response;
    }

    /**
     * Make a GET request to the API
     * @param endpoint - The endpoint to make the request to
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async get<T>(
        endpoint: string,
        token: string | null | undefined = null,
        options?: RequestInit
    ): Promise<Response> {
        return await this.request<T>(endpoint, token, {
            ...options,
            method: "GET"
        });
    }

    /**
     * Make a POST request to the API
     * @param endpoint - The endpoint to make the request to
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async post<T>(
        endpoint: string,
        token: string | null | undefined = null,
        options?: RequestInit
    ): Promise<Response> {
        return await this.request<T>(endpoint, token, {
            ...options,
            method: "POST"
        });
    }
}
