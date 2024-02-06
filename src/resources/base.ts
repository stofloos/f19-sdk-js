import Client from "../";
import type { CachedAnonymousTokens } from "../";

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
    private requestTokens: CachedAnonymousTokens;

    /**
     * Create a new instance of the base class
     * @param {Client} client
     * @throws Error
     * @constructor Base
     */
    constructor(client: Client) {
        this.client = client;
        this.requestTokens = new Map();
    }

    /**
     * Make a request to the API using fetch and return the serialized response
     * @param endpoint - The endpoint to make the request to
     * @param method
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param requestTokenPlacement
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

        // Check if requestToken is already cached
        const cachedRequestToken = this.requestTokens.get(uri);


        // Get current time in UTC seconds
        const currentTime = new Date(Date.now()).getUTCMilliseconds();

        // If requestToken is cached and not expired, use it
        if (cachedRequestToken && cachedRequestToken.expires > currentTime) {
            requestToken = cachedRequestToken.token;
        }

        // If requestToken is not cached, get a new one
        if (requestTokenPlacement && !requestToken) {
            requestToken = await this.client.getRequestToken(
                uri,
                method,
                options
            );

            // Expires in 55 minutes in UTC seconds
            const expires = new Date(Date.now()).getUTCMilliseconds() + this.client.config.cacheExpiration;


            // Check if requestToken is already cached and remove it
            if (this.requestTokens.has(uri)) {
                this.requestTokens.delete(uri);
            }

            // Add new requestToken to cache
            this.requestTokens.set(uri, {
                uri,
                method,
                token: requestToken,
                expires
            });
        }

        const url = `${this.client.config.baseUrl}${uri}${
            requestTokenPlacement === "QUERY" ? `?t=${requestToken}` : ""
        }`;

        const fetchOptions: RequestInit = {
            ...(options || {}),
            method,
            cache: "no-cache",
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
            throw new Error(response?.statusText ?? "Unauthorized");
        }
        return response;
    }

    /**
     * Make a GET request to the API
     * @param endpoint - The endpoint to make the request to
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param requestTokenPlacement
     * @returns {Promise<Response>}
     */
    async get(
        endpoint: string,
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
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param requestTokenPlacement
     * @returns {Promise<Response>}
     */
    async post(
        endpoint: string,
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
