import Client from "../index";

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

export type RequestTokenPlacement = "HEADER" | "QUERY" | null;
export default abstract class Base {
    private readonly client: Client;

    /**
     * Create a new instance of the base class
     * @param {Client} client
     * @throws Error
     * @constructor Base
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Make a request to the API using fetch and return the serialized response
     * @param endpoint - The endpoint to make the request to
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @returns {Promise<Response>}
     */
    async request(
        endpoint: string,
        method: "GET" | "POST",
        options?: RequestInit,
        requestTokenPlacement: RequestTokenPlacement = "HEADER"
    ): Promise<Response> {
        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }
        const uri = `${this.client.config.apiPath}${endpoint}`;
        let requestToken = "";
        if (requestTokenPlacement)
            requestToken = await this.client.getRequestToken(uri, method);

        const url = `${this.client.config.baseUrl}${uri}${requestTokenPlacement === "QUERY" ? `?t=${requestToken}` : ""
            }`;

        const fetchOptions = {
            method: method,
            ...(options || {}),
            headers: {
                ...(options?.headers ?? {}),
                ...(requestTokenPlacement === "HEADER"
                    ? { "X-F19-RequestToken": requestToken }
                    : {}),
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
        options?: RequestInit,
        requestTokenPlacement: RequestTokenPlacement = "HEADER"
    ): Promise<Response> {
        return await this.request(
            endpoint,
            "GET",
            {
                ...options
            },
            requestTokenPlacement
        );
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
        options?: RequestInit,
        requestTokenPlacement: RequestTokenPlacement = "HEADER"
    ): Promise<Response> {
        // Add token as header if provided and method is POST
        return await this.request(
            endpoint,
            "POST",
            {
                ...options
            },
            requestTokenPlacement
        );
    }
}
