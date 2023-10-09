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
     * @param projectId
     * @param options
     * @param channel
     * @returns {Promise<ArticlesResponse>}
     * @throws Error
     *
     */
    async getAllByProjectId(
        projectId: string,
        channel: ChannelType = "*",
        options?: RequestInit
    ): Promise<ArticlesResponse> {
        if (!projectId || projectId === "") {
            throw new Error("Project id not provided");
        }

        return this.get(`/${resource}/project/${projectId}`, options)
            .then(response => {
                return response.json();
            })
            .then((data: ArticlesResponse) => {
                if (channel && data.payload) {
                    // If a channel is provided,
                    // filter out articles without the specified channel
                    data.payload = data.payload.filter(article => {
                        if (channel !== "*") {
                            const channelTags = article.multiChannelTags.find(
                                (tag: MultiChannelTag) =>
                                    tag.channel === channel
                            );

                            return channelTags?.tags?.["is-visible"] !== false;
                        }
                        return true;
                    });
                }
                return data;
            });
    }

    /**
     * Get an article by id
     * @method getById
     * @param articleId
     * @param channel
     * @param options
     * @returns {Promise<ArticleResponse>}
     * @throws Error
     */
    async getById(
        articleId: string,
        channel: ChannelType = "*",
        options?: RequestInit
    ): Promise<ArticleResponse> {
        if (!articleId || articleId === "") {
            throw new Error("Article id not provided");
        }

        return this.get(`/${resource}/${articleId}`, options)
            .then(response => {
                return response.json();
            })
            .then((data: ArticleResponse) => {
                if (channel && data.payload) {
                    // If a channel is provided,
                    // filter out articles without the specified channel
                    data.payload.multiChannelTags =
                        data.payload.multiChannelTags.filter(tag => {
                            return tag.channel === channel;
                        });
                }
                return data;
            });
    }
}
