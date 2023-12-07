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
     * @return {Promise<WebsitesResponse>} A promise that returns a {@link WebsitesResponse}
     * @example
     * const websites = await client.websites.getAll()
     */
    async getAll(): Promise<WebsitesResponse> {
        const response = await this.get(`/${resource}`);
        const json = await response.json();
        return json;
    }

    /**
     * Get a website by alias
     * @param alias
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getByAlias("my-website")
     */
    async getByAlias(alias: string): Promise<WebsiteResponse> {
        if (!alias || alias === "") {
            throw new Error("No alias provided");
        }

        const response = await this.get(`/${resource}/alias/${alias}`);
        const json = await response.json();
        return json;
    }

    /**
     * Get current website
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getCurrent()
     */
    // TODO: Fix getCurrent call. It's not working.
    async getCurrent(): Promise<WebsiteResponse> {
        const response = await this.get(`/${resource}/current`);
        const json = await response.json();
        return json;
    }
}
