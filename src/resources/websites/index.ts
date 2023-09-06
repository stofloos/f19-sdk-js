import type { WebsitesResponse, WebsiteResponse } from "./types";
import { Config } from "../../types";
import Base from "../base";
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
    async getAll(preview: boolean = false): Promise<WebsitesResponse> {
        return this.get(`/${resource}`, preview).then(response => {
            return response.json();
        });
    }

    /**
     * Get a website by alias
     * @param alias
     * @param preview
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getByAlias("my-website")
     */
    async getByAlias(
        alias: string,
        preview: boolean = false
    ): Promise<WebsiteResponse> {
        if (!alias || alias === "") {
            throw new Error("No alias provided");
        }

        return this.get(`/${resource}/alias/${alias}`, preview).then(
            response => {
                return response.json();
            }
        );
    }

    /**
     * Get current website
     * @async
     * @param preview
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getCurrent()
     */
    // TODO: Fix getCurrent call. It's not working.
    async getCurrent(preview: boolean = false): Promise<WebsiteResponse> {
        return this.get(`/${resource}/current`, preview).then(response => {
            return response.json();
        });
    }
}
