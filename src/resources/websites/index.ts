import { BaseResponse, Website } from "../../types";
import Base from "../base";

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
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @return {Promise<WebsitesResponse>} A promise that returns a {@link WebsitesResponse}
     * @example
     * const websites = await client.websites.getAll()
     */
    async getAll(options?: RequestInit): Promise<WebsitesResponse> {
        const response = await this.get(`/${resource}`, options || {});
        return await response.json();
    }

    /**
     * Get a website by alias
     * @async
     * @param alias
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getByAlias("my-website")
     */
    async getByAlias(
        alias: string,
        options?: RequestInit
    ): Promise<WebsiteResponse> {
        if (!alias || alias === "") {
            throw new Error("No alias provided");
        }

        const response = await this.get(
            `/${resource}/alias/${alias}`,
            options || {}
        );
        return await response.json();
    }

    /**
     * Get current website
     * @async
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getCurrent()
     */
    async getCurrent(options?: RequestInit): Promise<WebsitesResponse> {
        const response = await this.get(`/${resource}/current`, options || {});
        return await response.json();
    }
}
