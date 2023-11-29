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
    readonly clientId?: string;

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
        this.clientId = config.clientId;
    }

    /**
     * Make a request to the API using fetch and return the serialized response
     * @param endpoint - The endpoint to make the request to
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async request(endpoint: string, options?: RequestInit): Promise<Response> {
        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }

        const url = `${this.baseUrl}${this.apiPath}${endpoint}`;

        const fetchOptions = {
            ...(options || {}),
            headers: {
                ...(options?.headers ?? {}),
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, fetchOptions);

        if (response.status === 401) {
            throw new Error("Unauthorized");
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
    async get(
        endpoint: string,
        token: string | null | undefined = null,
        options?: RequestInit
    ): Promise<Response> {
        // Add token as query parameter if provided and method is GET
        const endpointWithToken = token ? `${endpoint}?t=${token}` : endpoint;

        return await this.request(endpointWithToken, {
            ...options,
            method: "GET",
                ...(!token ?   { headers: {"X-API-Key": this.apiKey}} : {})
        });
    }

    /**
     * Make a POST request to the API
     * @param endpoint - The endpoint to make the request to
     * @param token - Optional token to be appended to the request
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async post(
        endpoint: string,
        token: string | null | undefined = null,
        options?: RequestInit
    ): Promise<Response> {
        // Add token as header if provided and method is POST
        return await this.request(endpoint, {
            ...options,
            method: "POST",
            ...(token ? { headers: { "X-F19-RequestToken": token } } : { headers: {"X-API-Key": this.apiKey}})
        });
    }
}
