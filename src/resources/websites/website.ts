import type { WebsitesResponse, WebsiteResponse } from "./types";
import { Config } from "../../types";
import { Base } from "../base";

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
    constructor(config: Config) {
        super(config);
    }

    /**
     * Get all websites
     * @async
     * @return {Promise<WebsitesResponse>} A promise that returns a {@link WebsitesResponse}
     * @example
     * const websites = await client.websites.getAll()
     */
    async getAll(): Promise<WebsitesResponse> {
        return this.request("/cms/api/public/v1/website", {
            method: "GET"
        }).then(response => {
            return response.json();
        });
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

        return this.request(`/cms/api/public/v1/website/alias/${alias}`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }

    /**
     * Get currrent website
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getCurrent()
     */
    // TODO: Fix getCurrent call. It's not working.
    async getCurrent(): Promise<WebsiteResponse> {
        return this.request(`/cms/api/public/v1/website/current`, {
            method: "GET"
        }).then(response => {
            return response.json();
        });
    }
}
