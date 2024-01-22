import Base from "../base";
import { ChannelType, MultiChannelTag } from "../../types";
import { Article, BaseResponse } from "../../types";

export interface ArticlesResponse extends BaseResponse {
    payload: Array<Article>;
}

export interface ArticleResponse extends BaseResponse {
    payload: Article | null;
}

/**
 * Articles instance
 * @class Articles
 * @constructor Articles
 * @param {Config} config
 * @extends Base
 *
 */

const resource = "article";
export default class Articles extends Base {
    /**
     * Get all articles for a project
     * @method getAllByProjectId
     * @param {string} projectId - The ID of the project
     * @param {ChannelType} channel - The channel to filter articles by, defaults to all channels
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<ArticlesResponse>}
     * @throws Error if project ID is not provided
     */
    async getAllByProjectId(
        projectId: string,
        channel: ChannelType = "*",
        options?: RequestInit
    ): Promise<ArticlesResponse> {
        if (!projectId || projectId === "") {
            throw new Error("Project id not provided");
        }

        const response = await this.get(
            `/${resource}/project/${projectId}`,
            options || {}
        );
        const json = await response.json();

        if (channel && json.payload) {
            json.payload = json.payload.filter((article: Article) => {
                if (channel !== "*") {
                    const channelTags = article.multiChannelTags.find(
                        (tag: MultiChannelTag) => tag.channel === channel
                    );

                    return channelTags?.tags?.["is-visible"] !== false;
                }
                return true;
            });
        }
        return json;
    }

    /**
     * Get an article by id
     * @method getById
     * @param {string} articleId - The ID of the article
     * @param {ChannelType} channel - The channel to filter the article by, defaults to all channels
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<ArticleResponse>}
     * @throws Error if article ID is not provided
     */
    async getById(
        articleId: string,
        channel: ChannelType = "*",
        options?: RequestInit
    ): Promise<ArticleResponse> {
        if (!articleId || articleId === "") {
            throw new Error("Article id not provided");
        }

        const response = await this.get(
            `/${resource}/id/${articleId}`,
            options
        );
        const json = await response.json();
        if (channel && json.payload) {
            json.payload.multiChannelTags =
                json.payload.multiChannelTags.filter((tag: MultiChannelTag) => {
                    return tag.channel === channel;
                });
        }
        return json;
    }
}
