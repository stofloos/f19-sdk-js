import { Config } from "../../index";
import { BaseResponse, Block } from "../../index";
import Base from "../base";

export declare type Route = {
    id: string;
    parentId: string | null;
    name: string;
    urlSegment: string;
    sortOrder: number;
    url: string;
    block: Block | null;
};

export declare type Website = {
    id: string;
    name: string;
    alias: string;
    routes: Array<Route>;
};

export declare interface WebsitesResponse extends BaseResponse {
    payload: Array<Website>;
}

export declare interface WebsiteResponse extends BaseResponse {
    payload: Website | null;
}

const resource = "website";
/**
 * Websites resource
 * @class
 * @extends Base
 * @param {Config} config An instance of {@link Config} to configure the SDK
 */

export default class Websites extends Base {
    /**
     * Create a new instance of the Websites resource
     * @param config
     * @constructor
     * @example
     * const client = new Client({
     *  apiKey: "API_KEY,"
     *  baseUrl: "https://my-f19-instance.com"
     *  })
     *
     */

    /**
     * Get all websites
     * @async
     * @param token
     * @param options - Optional options to pass to fetch
     * @return {Promise<WebsitesResponse>} A promise that returns a {@link WebsitesResponse}
     * @example
     * const websites = await client.websites.getAll()
     */
    async getAll(
        options: RequestInit = {},
        token?: string
    ): Promise<WebsitesResponse> {
        return this.get(`/${resource}`, token, options).then(response => {
            return response.json();
        });
    }

    /**
     * Get a website by alias
     * @param alias
     * @param options - Optional options to pass to fetch
     * @param token
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getByAlias("my-website")
     */
    async getByAlias(
        alias: string,
        options: RequestInit = {},
        token?: string
    ): Promise<WebsiteResponse> {
        if (!alias || alias === "") {
            throw new Error("No alias provided");
        }

        return this.get(`/${resource}/alias/${alias}`, token, options).then(
            response => {
                return response.json();
            }
        );
    }

    /**
     * Get current website
     * @async
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param token - Optional token to be appended to the request
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getCurrent()
     */
    // TODO: Fix getCurrent call. It's not working.
    async getCurrent(
        options: RequestInit = {},
        token?: string
    ): Promise<WebsiteResponse> {
        return this.get(`/${resource}/current`, token, options).then(
            response => {
                return response.json();
            }
        );
    }
}
