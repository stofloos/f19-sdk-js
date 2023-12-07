import Base from "../base";
import { ChannelType, MultiChannelTag } from "../../index";
import { Article, BaseResponse } from "../../index";

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
     * @param projectId - The ID of the project
     * @param channel - The channel to filter articles by, defaults to all channels
     * @returns {Promise<ArticlesResponse>}
     * @throws Error if project ID is not provided
     */
    async getAllByProjectId(
        projectId: string,
        channel: ChannelType = "*"
    ): Promise<ArticlesResponse> {
        if (!projectId || projectId === "") {
            throw new Error("Project id not provided");
        }

        const response = await this.get(`/${resource}/project/${projectId}`);
        const json = await response.json();
        if (channel && json.payload) {
            json.payload = json.payload.filter((article: any) => {
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
     * @param articleId - The ID of the article
     * @param channel - The channel to filter the article by, defaults to all channels
     * @returns {Promise<ArticleResponse>}
     * @throws Error if article ID is not provided
     */
    async getById(
        articleId: string,
        channel: ChannelType = "*"
    ): Promise<ArticleResponse> {
        if (!articleId || articleId === "") {
            throw new Error("Article id not provided");
        }

        const response = await this.get(`/${resource}/id/${articleId}`);
        const json = await response.json();
        if (channel && json.payload) {
            json.payload.multiChannelTags =
                json.payload.multiChannelTags.filter((tag: any) => {
                    return tag.channel === channel;
                });
        }
        return json;
    }
}
